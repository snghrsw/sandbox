void main() {
  Pen iHaveAPenLeft = new Pen();
  Apple iHaveAnApple = new Apple();
  // Ohhn...
  ApplePen applePen = iHaveAPenLeft + iHaveAnApple;

  Pen iHaveAPenRight = new Pen();
  Pineapple iHaveAPineapple = new Pineapple();
  // Ohhn...
  PineapplePen pineapplePen = iHaveAPenRight + iHaveAPineapple;

  applePen + pineapplePen;
}

class Pen {
  FruitPen operator +(Fruit fruit) =>
      fruit is Apple ? new ApplePen() : new PineapplePen();
}

class Fruit {}

class Apple extends Fruit {}

class Pineapple extends Fruit {}

class FruitPen extends Pen {
  void operator +(FruitPen fruitpen) => print('Pen-PineApple-Apple-Pen');
}

class ApplePen extends FruitPen {}

class PineapplePen extends FruitPen {}
