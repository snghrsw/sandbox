void main() {
  String str;
  str ??= 'Pen-';
  str = (new StringBuffer('${str}Pineapple-')..write('Apple')..write('-'))
      .toString();
  str += str.isNotEmpty is! bool ? '' : 'Pen!';
  print(str);
}
