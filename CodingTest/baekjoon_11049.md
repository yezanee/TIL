# 💡 **문제 분석 요약**

행렬 N개의 크기가 주어졌을 때, 모든 행렬을 곱하는데 필요한 곱셈 연산 횟수의 최솟값 구하기

**< 조건 >**

1. 같은 곱셈이지만 **곱셈을 하는 순서에 따라서 곱셈 연산의 수가 달라짐**
2. 입력 조건
    1. 첫째 줄의 행렬의 개수 N (1 ≤ N ≤ 500)
    2. 둘째 줄부터 N개 줄에 행렬의 크기 r과 c (1 ≤ r, c ≤ 500)
    3. 항상 **순서대로 곱셈을 할 수 있는** 크기만 주어짐 (순서 바꿀 수 없다.)
3. 출력 조건
    1. N개의 행렬을 곱하는데 필요한 곱셈 연산의 최솟값 (1 ≤ result ≤ $2^{31}-1$)

# 💡 **알고리즘 설계**

### **행렬 체인 곱셈 문제**

주어진 행렬 $A_1, A_2, A_3, … A_n$이 있다.

이 행렬들을 곱할 때, **곱셈 연산의 순서에 따라 연산 횟수가 달라진다.**

목표는 **곱셈 연산의 총 횟수를 최소화하는 순서를 찾는 것**이다.

### **동적 계획법을 사용하는 이유**

DP는 문제를 더 작은 문제로 나누어 해결한 뒤, 그 결과를 이용해 원래 문제를 해결하는 방법이다.

행렬 체인 곱셈 문제에서는, 행렬 곱셈 순서를 결정할 때 **가능한 모든 부분 문제를 고려하여** 최소 연산 횟수를 계산한다.

### 핵심

1. 부분 문제 정의 : dp[i][j]는 행렬 A_i부터 A_j까지 곱하는 데 필요한 최소 연산 횟수
2. 부분 문제의 크기 : 먼저 크기가 작은 부분 문제 해결 → 점점 큰 문제

**핵심 코드 설명**

```java
for (int k = i; k < j; k++) {
    dp[i][j] = Math.min(dp[i][j],
        dp[i][k] + dp[k + 1][j] + matrixSize[i][0] * matrixSize[k][1] * matrixSize[j][1]);
				// i부터 k까지 행렬 분할 후 총 연산 횟수 저장
}
```

- **변수 `k`의 역할**:
    - `k`는 현재 부분 문제를 분할하는 지점. 행렬 체인을 두 부분으로 나누기 위한 인덱스.
    - `i`부터 `j`까지의 행렬을 `i`부터 `k`까지와 `k+1`부터 `j`까지로 나눔
- **갱신 식**:
    - `dp[i][j]`는 행렬 $A_i$부터 $A_j$까지 곱하는 데 필요한 최소 연산 횟수
    - `dp[i][k]`는 행렬 $Ai부$터 $Ak$까지 곱하는 데 필요한 최소 연산 횟수
    - `dp[k + 1][j]`는 행렬 $A_{k+1}$부터 $A_j$까지 곱하는 데 필요한 최소 연산 횟수
    - `matrixSize[i][0] * matrixSize[k][1] * matrixSize[j][1]`는 두 행렬 $A_i$부터 $A_k$까지와 $A_{k+1}$부터 $A_j$까지를 곱하는 데 필요한 연산 횟수
- **갱신 과정**:
    - `dp[i][j]`의 값을 업데이트 현재 `dp[i][j]`와 새로 계산된 값 `dp[i][k] + dp[k + 1][j] + matrixSize[i][0] * matrixSize[k][1] * matrixSize[j][1]` 중 더 작은 값을 선택
    - 이는 행렬  $A_i$부터 $A_j$까지 곱하는 최적의 순서를 찾기 위함

# 💡 코드

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main
{
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int N = Integer.parseInt(br.readLine()); // 행렬의 개수
		int[][] matrixSize = new int[N][2]; // 행렬의 크기 배열
		
		for(int i = 0; i < N; i++) {
		    StringTokenizer st = new StringTokenizer(br.readLine());
		    matrixSize[i][0] = Integer.parseInt(st.nextToken()); // 행 크기
		    matrixSize[i][1] = Integer.parseInt(st.nextToken()); // 열 크기
		}
		
		long[][] dp = new long[N][N]; // 행렬 곱하는데 필요한 최소 곱셈 연산 횟수
		
		for (int len = 1; len < N; len++) {
		// len = 곱하는 행렬의 개수를 나타냄
		// len = 1, 연속된 두 개의 행렬 곱
		// len = 2, 연속된 세 개의 행렬 곱
		// ...
		    for (int i = 0; i + len < N; i++) { // i는 시작 index
		        int j = i + len; // j는 끝 인덱스 (i에서 len 만큼 떨어진 위치에 존재)
		        dp[i][j] = Long.MAX_VALUE; // 최소값 찾기 쉽게 초기화

		        for (int k = i; k < j; k++) { // 행렬 체인을 두 부분으로 분할
		            dp[i][j] = Math.min(dp[i][j],
		                dp[i][k] + dp[k + 1][j] + matrixSize[i][0] * matrixSize[k][1] * matrixSize[j][1]);
		                // 행렬 i부터 k까지와, 행렬 k+1부터 j까지 행렬 곱을 계산하여 두개로 분할 후 총 연산 횟수 저장 
		        }
		    }
		}

		System.out.println(dp[0][N - 1]);
	}
}

```

# 💡 시간복잡도

O(N^3)

# 💡 틀린 풀이 & 틀린 이유 (주석으로)

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main
{
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int N = Integer.parseInt(br.readLine()); // 행렬의 개수
		int[][] matrixSize = new int[N][2]; // 행렬의 크기 배열
		
		for(int i = 0; i < N; i++) {
	    	StringTokenizer st = new StringTokenizer(br.readLine());
		    matrixSize[i][0] = Integer.parseInt(st.nextToken()); // 행 크기
		    matrixSize[i][1] = Integer.parseInt(st.nextToken()); // 열 크기
		}
		
		long[][] dp = new long[N][N]; // 행렬 곱하는데 필요한 곱셈 연산 횟수
		
		/* 이 문제에서의 핵심은 '순서'가 중요하다.
		최적의 순서를 찾기 위해서는 모든 곱셈 순서를 고려해야 한다.
		따라서, 인접한 행렬만을 고려하는 방식은 전체 문제를 해결할 수 없다.
		이는 단순히 두 개의 행렬을 곱하는 문제와 달리, 여러 개의 행렬을 곱하는 순서에 따라
		최종 연산 횟수가 달라지기 때문이다.
		근데, 여기서는 단순히 인접한 행렬의 곱셈 연산 횟수를 잘못 저장하고 있다. */
		for(int i = 0; i < N - 1; i++) {
		    for(int j = 0; j < N - 1; j++) {
		        dp[i][j] = matrixSize[j][0] * matrixSize[j+1][1];
		    }
		}
		
		// 잘못된 값 가짐
		long result = dp[0][0];
		
		/* dp 배열 값 단순 비교해서 찾으려고 하는 코드
		dp 배열이 올바르게 초기화 되지 않았으므로 잘못된 결과 출력 */
		for(int i = 0; i < N - 1; i++) {
		    for(int j = 0; j < N - 1; j++) {
		        result = Math.min(result, dp[i][j]);
		    }
		}
		
		System.out.println(result);
		
	}
}
```

# 💡 느낀점 or 기억할정보

- **행렬 체인 곱셈 문제 해결 방법**

코드를 보아도 이해하기 어려웠다 .. 예제를 보고 이해하고, 기억하기.

**예제**

행렬 A, B, C의 크기가 각각 10×30, 30×5, 5×60이라고 가정

- dp[0][2]를 계산하는 과정:
    - k=0일 때:
        - dp[0][0] = 0 (단일 행렬이므로 곱셈 연산 필요 없음)
        - dp[1][2] = 30 × 5 × 60 = 9000
        - 총 연산 횟수: 0 + 9000 + 10 × 30 × 60 = 27000
    - k=1k = 1k=1일 때:
        - dp[0][1] = 10 × 30 × 5 = 1500
        - dp[2][2]=0 (단일 행렬이므로 곱셈 연산 필요 없음)
        - 총 연산 횟수: 1500 + 0 + 10 × 5 × 60 = 4500
- 최종적으로 dp[0][2] = 4500
