# 💡 **문제 분석 요약**

주어진 `n`에 대해 2^n x 2^n 크기의 배열을 Z 모양으로 순회하면서 특정 좌표 (r, c)의 방문 순서를 찾는 문제 (1780번 종이의 개수 문제와 유사)

# 💡 **알고리즘 설계**

- 배열을 재귀적으로 4개의 사분면으로 나눔.
    - 각 사분면은 전체 배열의 크기를 절반씩 나눈 크기를 가짐.
    - 밑의 그림 참고
        
        ![스크린샷 2024-07-10 오후 3.09.25.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/dd62ff2b-dab4-4845-86cf-0b0dfe47f017/9cf81457-a7fd-4414-bb09-18fb482d694e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.09.25.png)
        
- 각 재귀 호출마다 현재 좌표가 속한 사분면을 결정
    - base case는 size = 1일때, 더 이상 분할할 수 없으므로 재귀 종료!
- 해당 좌표가 속한 사분면의 시작 순서 번호를 누적하여 재귀적으로 탐색
    - 1사분면: 시작 순서 번호 = 0
        - 순서 번호에 변화를 주지 않고, 1사분면 내에서 재귀호출
    - 2사분면: 시작 순서 번호 = 1사분면의 크기
        - 시작 순서 번호를 count에 더한 상태에서, 2사분면 내에서 재귀 호출
    - 3사분면: 시작 순서 번호 = 1사분면 + 2사분면의 크기
        - 시작 순서 번호를 count에 더한 상태에서, 3사분면 내에서 재귀 호출
    - 4사분면: 시작 순서 번호 = 1사분면 + 2사분면 + 3사분면의 크기
        - 시작 순서 번호를 count에 더한 상태에서, 4사분면 내에서 재귀 호출

# 💡 코드

```java
import java.io.*;
import java.util.StringTokenizer;

public class Main {
    static int r, c;
    static int count = 0; // 결과 값

    public static void main(String[] args) throws IOException {
        // BufferedReader를 사용하여 입력을 받음
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 입력을 공백 기준으로 나누기 위해 StringTokenizer 사용
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        r = Integer.parseInt(st.nextToken());
        c = Integer.parseInt(st.nextToken());
        
        // 2^n 크기의 배열 크기 계산
        int size = (int)Math.pow(2, n);
        // Z 순회 순서 계산
        findZOrder(0, 0, size);
        // 결과 출력
        System.out.println(count);
    }
    
    // Z 순회 순서를 재귀적으로 찾는 메서드
    public static void findZOrder(int row, int col, int size) {
        // 기본 크기인 1x1에 도달하면 종료
        if (size == 1) {
            return;
        }
        
        // 현재 크기의 절반 계산
        int newSize = size / 2;
        // 각 사분면의 크기 계산
        int area = newSize * newSize;
        
        // 1사분면: 좌표가 (row, col)에서 시작하는 경우
        if (r < row + newSize && c < col + newSize) {
            findZOrder(row, col, newSize);
        }
        // 2사분면: 좌표가 (row, col + newSize)에서 시작하는 경우
        else if (r < row + newSize && c >= col + newSize) {
            count += area;
            findZOrder(row, col + newSize, newSize);
        }
        // 3사분면: 좌표가 (row + newSize, col)에서 시작하는 경우
        else if (r >= row + newSize && c < col + newSize) {
            count += 2 * area;
            findZOrder(row + newSize, col, newSize);
        }
        // 4사분면: 좌표가 (row + newSize, col + newSize)에서 시작하는 경우
        else {
            count += 3 * area;
            findZOrder(row + newSize, col + newSize, newSize);
        }
    }
}

```

# 💡시간복잡도

O(log N)

# 💡 다른 풀이

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	      StringTokenizer st = new StringTokenizer(br.readLine());
	      
        int n = Integer.parseInt(st.nextToken());
        int r = Integer.parseInt(st.nextToken());
        int c = Integer.parseInt(st.nextToken());
        
        int result = divideAndConquer(n, r, c);
        System.out.println(result);
    }
    
    public static void divideAndConquer(int n, int row, int col) {
        if (n == 0) return 0;
        
        int half = Math.pow(2, n-1);
        int quadrantSize = half * half; // 각 사분면의 크기
        
        // 각 사분면에 대해 조건문을 사용하여 현재 좌표가 속한 사분면을 결정하고, 해당 사분면의 시작 인덱스를 추가하여 재귀적으로 호출합니다.
        // 각 사분면의 시작 인덱스를 누적하여 재귀적으로 호출하며, 최종적으로 해당 좌표의 순서 번호를 반환합니다.
        if (row < half && col < half) {
            return divideAndConquer(n - 1, row, col); // 1사분면 : (0,0)부터 시작하는 경우
        } else if (row < half && col >= half) {
            return quadrantSize + divideAndConquer(n - 1, row, col - half); // 2사분면 : (0, half)부터 시작하는 경우
        } else if (row >= half && col < half) {
            return 2 * quadrantSize + divideAndConquer(n - 1, row - half, col); // 3사분면 : (half, 0)부터 시작하는 경우
        } else {
            return 3 * quadrantSize + divideAndConquer(n - 1, row - half, col - half); // 4사분면 : (half, half)부터 시작하는 경우
        }
    }
}
```

# 💡 느낀점 or 기억할정보

- 분할 정복 문제는 느낌이 다 비슷한 것 같다. 문제 보자마자 1780번과 유사하다고 느꼈다.
- 알고리즘을 이해하기가 조금 어려웠으므로 예를 들어서 이해하자
    - n = 2 (4 x 4배열)일때, (3, 1)의 순서 번호 구하는 과정 예시
        - **4x4 배열 분할**:
            - (3, 1)은 3사분면에 위치
            - `count += 8` (3사분면의 시작 순서 번호)
        - **2x2 배열 분할**:
            - 3사분면 내에서 (1, 1)은 2사분면에 위치
            - `count += 1` (2사분면의 시작 순서 번호)
        - **1x1 배열 분할**:
            - 2사분면 내에서 (1, 1)의 위치는 구할 수 있으며, size가 1이므로 종료
