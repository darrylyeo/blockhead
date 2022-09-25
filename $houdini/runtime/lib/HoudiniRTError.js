// Houdini Runtime Error (something light-weighted)
export class HoudiniRTError extends Error {
    constructor(message, { type = 'default', extraInfo = [], quiet = false, }) {
        // log extra info before throwing error
        extraInfo === null || extraInfo === void 0 ? void 0 : extraInfo.forEach((line) => {
            console.log(line);
        });
        super(type === 'OutdatedFunction' ? `Outdated function "${message}"` : message);
        // if quiet, don't log the stack trace
        if (quiet) {
            this.stack = '';
        }
    }
}
