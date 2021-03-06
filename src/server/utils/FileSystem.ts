/**
 * FileSystem.ts
 *
 * Created on: 2016-09-28
 *     Author: Adrian Hintze
 *
 */

import * as fs from 'fs';

import * as mkdirp from 'mkdirp';

export function isDir(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.stat(path, (error: NodeJS.ErrnoException | null, stat: fs.Stats) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stat.isDirectory());
        });
    });
}

export function isDirSync(path: string): boolean {
    return fs.statSync(path).isDirectory();
}

export function dirExists(path: string): Promise<boolean> {
    return isDir(path)
    .then(result => result)
    .catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') {
            return false;
        }

        throw error;
    });
}

export function dirExistsSync(path: string): boolean {
    try {
        return isDirSync(path);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }

        throw error;
    }
}

export async function makeDir(path: string): Promise<undefined> {
    if (await dirExists(path)) {
        return;
    }

    await mkdirp(path);
    return;
}

export function makeDirSync(path: string): void {
    if (!dirExistsSync(path)) {
        mkdirp.sync(path);
    }
}

export function readFile(path: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer);
        });
    });
}

export function readFileSync(path: string): Buffer {
    return fs.readFileSync(path);
}

export function readTextFile(path: string, encoding: string = 'utf8'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, encoding, (error: NodeJS.ErrnoException | null, text: string) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(text);
        });
    });
}

export function readTextFileSync(path: string, encoding: string = 'utf8'): string {
    return fs.readFileSync(path, encoding);
}

export function readDir(path: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(path, (error: NodeJS.ErrnoException | null, contents: string[]) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(contents);
        });
    });
}

export function readDirSync(path: string): string[] {
    return fs.readdirSync(path);
}

export function rmDir(path: string): Promise<undefined> {
    return new Promise<undefined>((resolve, reject) => {
        fs.unlink(path, (error: NodeJS.ErrnoException | null) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
