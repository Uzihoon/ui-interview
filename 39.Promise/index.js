class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(value) {
    if (this.status !== 'pending') return;
    this.result = value;
    this.status = 'fulfilled';

    queueMicrotask(() => {
      if (this.onFulfilled === undefined) return;

      try {
        const returnValue = this.onFulFilled(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  _reject(error) {
    if (this.status !== 'pending') return;
    this.result = error;
    this.status = 'rejected';

    queueMicrotask(() => {
      if (this.onRejected === undefined) return;

      try {
        const returnValue = this.onRejected(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  then(onFulFilled, onRejected) {
    const isOnFulFilledFunction = typeof onFulFilled === 'function';
    this.onFulFilled = isOnFulFilledFunction ? onFulFilled : (value) => value;

    const isOnRejectedFunction = typeof onRejected === 'function';
    this.onRejected = isOnRejectedFunction
      ? onRejected
      : (error) => {
          throw new Error(error);
        };

    return new MyPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    const isValuePromise = value instanceof MyPromise;

    if (isValuePromise) {
      return value;
    }

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }
}

const originalPromise = new Promise((resolve, reject) => {}).then(
  (value) => {},
  (error) => {}
);
