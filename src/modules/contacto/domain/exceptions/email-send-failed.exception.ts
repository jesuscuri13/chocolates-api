export class EmailSendFailedException extends Error {
  readonly cause?: Error;

  constructor(cause?: unknown) {
    super('Failed to send contact email');
    this.name = 'EmailSendFailedException';
    if (cause instanceof Error) this.cause = cause;
  }
}
