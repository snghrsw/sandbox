const String pen = 'Pen';
final String apple = 'apple';

void main() => print(pen +
    '-'
    'P'
    'i'
    'n'
    'e'
    '$apple'
    '${"        -          ".trim()}'
    '${apple.replaceFirst('a', 'a'.toUpperCase())}' +
    new StringBuffer('-').toString() +
    (() => '$pen!')() +
    '');
