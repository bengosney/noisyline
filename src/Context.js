class Context {
    static get() {
        return this.ctx;
    }

    static set(ctx) {
        this.ctx = ctx;
    }
}

Context.ctx = null;

export default Context;
