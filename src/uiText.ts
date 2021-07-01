/* eslint-disable no-console */
import { ScriptType } from 'playcanvas';

export class uiText extends ScriptType {
  public initialize(): void {
    console.log('Base Initialize');
  }

  public postInitialize(): void {
    console.log('Base Post-Initialize');
  }

  public get text(): string {
    return this.entity?.element.text || '';
  }
  public set text(text: string) {
    this.entity.element.text = text;
  }
}
