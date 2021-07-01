/* eslint-disable no-console */
import { ScriptAttributes, registerScript } from 'playcanvas';
import { formatSecondsToDigitalClock } from './formatSecondsToDigitalClock';
import { uiText } from './uiText';

class uiText_DigitalClock extends uiText {
  public static attributes: ScriptAttributes;

  public startNumber = 0;

  public postInitialize(): void {
    super.postInitialize();
    console.log('Child Post-Initialize');

    this.setNumberToText(this.startNumber);
  }

  public setNumberToText(time: number): void {
    this.text = formatSecondsToDigitalClock(time);
  }
}

registerScript(uiText_DigitalClock, 'config_setText_DigitalClock');

uiText_DigitalClock.attributes.add('startNumber', { type: 'number' });

export { uiText_DigitalClock };
