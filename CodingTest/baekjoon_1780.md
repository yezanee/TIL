# 💡**문제 분석 요약**

종이를 9등분하여 각 부분 종이가 동일한 숫자인지 확인하고, 각 숫자(-1, 0, 1)의 개수를 세는 문제

# 💡**알고리즘 설계**

주어진 종이가 동일한 숫자로 이루어져 있는 지 확인 후 (checkUniform)

그렇지 않다면 종이를 9등분하여 각 부분 다시 확인 (divideAndConquer)

이 과정을 종이가 모두 동일한 숫자로 이루어질 때 까지 반복

→ **재귀적인 성격**

1. 종이를 나누는 과정 반복적으로 발생
2. 큰 문제를 작은 문제로 나누고, 다시 그 작은 문제를 동일한 방식으로 해결

→ **분할**

1. 큰 문제(전체 종이) 9개의 작은 문제(9개의 부분 종이)로 분할
2. 각 작은 문제 동일한 방식으로 처리

→ **정복과 결합**

1. 각 작은 문제 해결 후 결과 결합하여 전체 문제 해결

# 💡코드

```java
import java.io.*;
import java.util.*;

public class Main {
    static int n; // 종이의 크기
    static int[][] paper; // 종이 배열
    static int[] cnt = new int[3]; // 각 숫자의 개수를 저장

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());
        paper = new int[n][n];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) {
                paper[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        divideAndConquer(0, 0, n); // 전체 종이에 대해 분할 정보 시작

        for (int i = 0; i < 3; i++) {
            System.out.println(cnt[i]); // 결과 출력
        }
    }
	
		// 분할 정복 메서드
    public static void divideAndConquer(int row, int col, int size) {
        if (checkUniform(row, col, size)) { // 현재 부분 종이가 모두 동일한 숫자인지 확인
            cnt[paper[row][col] + 1]++; // 동일한 숫자라면 해당 숫자의 개수를 증가시킴
            // 위와 같이 구현한 이유
            // cnt[0] : -1의 개수, cnt[1] : 0의 개수, cnt[2] : 1의 개수
            return;
        }

        int newSize = size / 3; // 종이를 3x3 크기로 나누기 위해 새로운 크기 계산
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                divideAndConquer(row + i * newSize, col + j * newSize, newSize);
                // 3x3 크기로 나누어 각 부분 종이에 대해 재귀 호출
            }
        }
    }
		
		// 현재 부분 종이가 모두 동일한 숫자인지 확인하는 메서드
    public static boolean checkUniform(int row, int col, int size) {
        int firstValue = paper[row][col]; // 첫 번째 값을 기준으로 삼음
        for (int i = row; i < row + size; i++) { // 부분 종이의 모든 칸을 확인
            for (int j = col; j < col + size; j++) {
                if (paper[i][j] != firstValue) { // 기준 값과 다른 값이 있다면 false 반환
                    return false;
                }
            }
        }
        return true; // 모든 값이 동일하다면 true 반환
    }
}
```

# 💡시간복잡도

O(N^2)

# 💡 틀린 이유

문제 조건을 제대로 읽지 않아 잘못 인지 했다.

내가 푼 풀이는 -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를

각각 단순히 구하여 출력하기만 했다.

↓ 내가 구현한 틀린 코드

```java
import java.io.*;
import java.util.*;

public class Main
{
    static int n;
    static int[][] paper;
	static int[] cnt = new int[3];
	
	public static void main(String[] args) throws IOException {
	    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	    n = Integer.parseInt(br.readLine());
	    paper = new int[n][n];
	    for(int i = 0; i < n; i++) {
	        StringTokenizer st = new StringTokenizer(br.readLine());
	        for(int j = 0; j < n; j++) {
	            paper[i][j] = Integer.parseInt(st.nextToken());
	        }
	   }
	   
	   Count(0, 0);

    }
	
	public static void Count(int row, int col) {
        if (col == n) {
           
           for(int i = 0; i < 3; i++) {
	            System.out.println(cnt[i]);
	       }
           
            return;
        }
        if (row == n) {
            Count(0, col + 1);
            return;
        }

        if (paper[col][row] == -1) {
            cnt[0] += 1;
        } else if (paper[col][row] == 0) {
            cnt[1] += 1;
        } else if (paper[col][row] == 1) {
            cnt[2] += 1;
        }

        Count(row + 1, col);
    }
}
```

# 💡 느낀점 or 기억할정보

- 문제 조건을 꼼꼼하게 읽는 습관을 들이자.
- 분할과 정복(재귀로 구현)개념을 이용한 이유 기억 (알고리즘 설계에 작성)
- 재귀로 나타낼 때 계속 작게 나누면서 함수를 호출하므로 매개변수에 행과 열 크기가 들어가도록 구현하는 게 좋음
