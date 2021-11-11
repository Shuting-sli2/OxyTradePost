/** Implements a Deferred, a simple way to create promises. */
export class Deferred {
    /*
    public promise: Promise<T>;
    public resolve: (result: T | PromiseLike<T>) => void;
    public reject: (reason: any) => void;
   */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            resolve("done");
        });
    }
}