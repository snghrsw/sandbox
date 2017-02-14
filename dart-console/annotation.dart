class annotation {
  final String a;
  final String b;
  const annotation(this.a, this.b);
}

class Test {}

@annotation('aaa', 'bbb')
void main() {
  print(new Test());
  reflect(new Text());
}
