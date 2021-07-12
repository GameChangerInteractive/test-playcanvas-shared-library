import { expect } from 'chai';
import { Application, Entity } from 'playcanvas';
import { formatSecondsToDigitalClock } from '../src/formatSecondsToDigitalClock';

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
  let app;

  let canvas;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    app = new Application(canvas, {});
  });

  afterEach(() => app.destroy());

  it("Does 'uiText_DigitalClock' format the element's text to look like a digital clock", () => {
    const entity = new Entity('Test Entity');
    const elementComponent = entity.addComponent('element');
    const scriptComponent = entity.addComponent('script');

    const digitalClock = scriptComponent.create('config_setText_DigitalClock');

    digitalClock.setNumberToText(100);

    expect(digitalClock.text).to.equal('1:40');
    expect(elementComponent.text).to.equal('1:40');
  });
});
