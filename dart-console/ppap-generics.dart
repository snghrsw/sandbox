typedef Apple();
typedef Pineapple();

void main() {
  Pen penRight = new Pen(); // I Have a pen
  Fruit<Apple> apple = new Fruit<Apple>(); // I Have an Apple
  FruitPen<Apple> applePen = penRight + apple; // Ohhhn... Apple Pen!

  Pen penLeft = new Pen(); // I Have a Pen
  Fruit<Pineapple> pineapple = new Fruit<Pineapple>(); // I Have a Pineapple
  FruitPen<Pineapple> pineapplePen =
      penLeft + pineapple; // Ohhhn ... Pineapple Pen!

  applePen + pineapplePen; // Apple Pen. Pineapple Pen. Ohhhn...
  // => Pen-Pineapple-Apple-Pen!
}

class Pen {
  FruitPen<T> operator +(Fruit<T> fruit) => new FruitPen<T>();
}

class Fruit<T> {}

class FruitPen<T> {
  void operator +(FruitPen<T> fruitPen) => print('Pen-Pineapple-Apple-Pen!');
}
