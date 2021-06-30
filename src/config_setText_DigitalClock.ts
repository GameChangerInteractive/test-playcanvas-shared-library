/* eslint-disable no-console */
import { ScriptAttributes, ScriptType, registerScript } from 'playcanvas';

class configSetText extends ScriptType {
  public initialize() {
    console.log('Base Initialize');
  }

  public postInitialize() {
    console.log('Base Post-Initialize');
  }

  protected get text() {
    return this.entity?.element.text || '';
  }
  protected set text(text) {
    this.entity.element.text = text;
  }
}

class configSetText_DigitalClock extends configSetText {
  public static attributes: ScriptAttributes;

  public startNumber = 0;

  public postInitialize() {
    super.postInitialize();
    console.log('Child Post-Initialize');

    this.setNumberToText(this.startNumber);
  }

  public setNumberToText(time: number) {
    const minutes = Math.floor(time / 60 || 0);
    const seconds = Math.floor(time % 60 || 0);

    const minutesText = minutes === 0 ? '0' : `${minutes}`;
    const secondsText = seconds < 10 ? `0${seconds}` : seconds;

    this.text = `${minutesText}:${secondsText}`;
  }
}

registerScript(configSetText_DigitalClock, 'config_setText_DigitalClock');

configSetText_DigitalClock.attributes.add('startNumber', { type: 'number' });
