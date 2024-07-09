## 재귀(Recursion)란?

- 함수가 자기 자신을 직접적 또는 간접적인 방법으로 호출하는 과정을 말한다.
- 재귀는 분할 정복 알고리즘(Divide and Conquer Algorithm)에서도 이용된다.
    - Divide and Conquer Algorithm : 둘 이상의 부분 문제로 나눈 뒤 각 문제에 대한 답을 재귀 호출을 이용해 계산하고, 각 부분 문제의 답으로부터 전체 문제의 답을 계산하는 알고리즘
    - 예를 들어 여러 요소들 중 최대값을 구하는 문제의 경우, 가장 작은 문제의 크기는 두 요소 사이의 최대값을 찾는 것이다.
- 함수에 종료 조건(exit condition = termination condition = base case)이 있어야 한다. 없으면 무한 루프에 빠진다.

## 반복문에 대한 재귀의 장점

- 코드를 깔끔하고 단순하게 작성할 수 있다.

## 반복문에 대한 재귀의 단점

- 모든 함수들이 종료 조건에 도달할 때 까지 스택에 남아있기 때문에 반복문에 비해 더 많은 공간이 필요하다.
- 함수 호출 및 반환 오버헤드로 인해 더 많은 시간이 필요하다.

## 재귀 이용 예시

- 팩토리얼
- 피보나치 수열
- 거스름돈 문제
- 합집합 문제
- 이진 탐색, 이진 트리, 이진 탐색 트리 등
- 병합 정렬, 퀵 정렬 등
- 깊이 우선 탐색
- 미로

## 구현 코드 예제

```java
public class Factorial {
    // 재귀적으로 팩토리얼을 계산하는 메서드
    // 시간 복잡도 : O(n), 공간 복잡도 : O(n)
    public static long factorialRecursive(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    // 반복적으로 팩토리얼을 계산하는 메서드
    // 시간 복잡도 : O(n), 공간 복잡도 : O(1)
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        int number = 5; // 예시 숫자
        System.out.println("Factorial of " + number + " (Recursive): " + factorialRecursive(number));
        System.out.println("Factorial of " + number + " (Iterative): " + factorialIterative(number));
    }
}
```
