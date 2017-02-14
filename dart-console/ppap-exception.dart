class PPAPExpection implements Exception {
  String pikotaro;
  PPAPExpection(this.pikotaro);
}

void func(int val) {
  try {
    throw new PPAPExpection('Pen-Pineapple-Apple-Pen!');
  } on PPAPExpection catch (e) {
    if (val > 0) {
      func(val - 1);
    } else if (val == 0) {
      print(e.pikotaro);
    }
  }
}

main() => func(5);
