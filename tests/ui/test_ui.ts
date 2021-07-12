import { expect } from 'chai';
import { Application, ElementComponent, Entity, ScriptComponent, registerScript, ELEMENTTYPE_TEXT } from 'playcanvas';
import { formatSecondsToDigitalClock } from '../../src/formatSecondsToDigitalClock';
import { uiText_DigitalClock } from '../../src/uiText_DigitalClock';

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

    uiText_DigitalClock.register(app);
  });

  afterEach(() => app.destroy());

  it("Does 'uiText_DigitalClock' format the element's text to look like a digital clock", () => {
    const entity = new Entity('Test Entity');
    const elementComponent: ElementComponent = <ElementComponent>entity.addComponent('element');
    elementComponent.type = ELEMENTTYPE_TEXT;

    const digitalClock: uiText_DigitalClock = uiText_DigitalClock.addToEntity(entity);

    digitalClock.setNumberToText(100);

    expect(digitalClock.text).to.equal('1:40');
    expect(elementComponent.text).to.equal('1:40');
  });

  const checkValue = ([number, result]) => {
    it(`Does 'uiText_DigitalClock' format ${number} to ${result}`, () => {
      const entity = new Entity('Test Entity');
      const elementComponent: ElementComponent = <ElementComponent>entity.addComponent('element');
      elementComponent.type = ELEMENTTYPE_TEXT;

      const digitalClock: uiText_DigitalClock = uiText_DigitalClock.addToEntity(entity);

      digitalClock.setNumberToText(number);

      expect(digitalClock.text).to.equal(result, "Unexpected Text");
      expect(elementComponent.text).to.equal(result, "Unexpected Element Text Value");
    });
  };

  [
    [0, '0:00'],
    [10, '0:10'],
    [60, '1:00'],
    [100, '1:40'],
    [60 * 60, '60:00'],

    [-0, '0:00'],
    [-10, '-0:10'],
    [-60, '-1:00'],
    [-100, '-1:40'],
    [-60 * 60, '-60:00'],

    [0.1, '0:00'],
    [0.9, '0:00'],
  ].forEach(checkValue);
});
