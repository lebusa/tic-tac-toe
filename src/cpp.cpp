#include<iostream>
using namespace::std;

int main() {
    int x, y = 4;
    x = (y/2 == y>>1) ? 1 : 2;
    cout << x << endl;
    cout << x++ << endl;
    cout << x << endl;
    cout << (y >> 1) << endl;
    return 0;
}