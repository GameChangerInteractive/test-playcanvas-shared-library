/* eslint-disable no-console */
import { ScriptAttributes, registerScript, Application, Entity } from 'playcanvas';
import { formatSecondsToDigitalClock } from './formatSecondsToDigitalClock';
import { uiText } from './uiText';

class uiText_DigitalClock extends uiText {
  public static attributes: ScriptAttributes;
  public static register(app?: Application): void {
    if (app) {
      registerScript(uiText_DigitalClock, uiText_DigitalClock.name, app);
    } else if (Application.getApplication()) {
      registerScript(uiText_DigitalClock);
    }
  }
  public static addToEntity(entity: Entity): uiText_DigitalClock {
    if (!entity.script) {
      entity.addComponent('script');
    }

    return <uiText_DigitalClock>entity.script.create(uiText_DigitalClock);
  }

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

uiText_DigitalClock.register();

uiText_DigitalClock.attributes.add('startNumber', { type: 'number' });

export { uiText_DigitalClock };
