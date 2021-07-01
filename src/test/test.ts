import { JSDOM } from 'jsdom';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = global.document.defaultView;

import { expect } from 'chai';
import { Application, ElementComponent, Entity, ScriptComponent } from 'playcanvas';
import { formatSecondsToDigitalClock } from '../formatSecondsToDigitalClock';
import { uiText_DigitalClock } from '../uiText_DigitalClock';

describe('Simple Tests', () => {
  it('1 + 1 = 2', () => expect(1 + 1).equals(2));

  it('Format Seconds to Digital Clock', () => {
    expect(formatSecondsToDigitalClock(0)).equal('0:00');
    expect(formatSecondsToDigitalClock(10)).equal('0:10');
    expect(formatSecondsToDigitalClock(60)).equal('1:00');
    expect(formatSecondsToDigitalClock(100)).equal('1:40');
    expect(formatSecondsToDigitalClock(60 * 60)).equal('60:00');

    expect(formatSecondsToDigitalClock(-0)).equal('0:00');
    expect(formatSecondsToDigitalClock(-10)).equal('-0:10');
    expect(formatSecondsToDigitalClock(-60)).equal('-1:00');
    expect(formatSecondsToDigitalClock(-100)).equal('-1:40');
    expect(formatSecondsToDigitalClock(-60 * 60)).equal('-60:00');
  });
});

describe("'uiText_DigitalClock' Tests", () => {
  let app: Application;

  let canvas: Element;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    app = new Application(canvas, {});
  });

  afterEach(() => app.destroy());

  it("Does 'uiText_DigitalClock' format the element's text to look like a digital clock", () => {
    const entity: Entity = new Entity('Test Entity');
    const elementComponent: ElementComponent = <ElementComponent>entity.addComponent('element');
    const scriptComponent: ScriptComponent = <ScriptComponent>entity.addComponent('script');

    const digitalClock: uiText_DigitalClock = <uiText_DigitalClock>(
      scriptComponent.create('config_setText_DigitalClock')
    );

    digitalClock.setNumberToText(100);

    expect(digitalClock.text).to.equal('1:40');
    expect(elementComponent.text).to.equal('1:40');
  });
});
