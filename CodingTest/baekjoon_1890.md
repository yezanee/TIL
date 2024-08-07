# 💡 **문제 분석 요약**

**문제 설명**

**N×N 게임판**에 수가 적혀져 있다. 이 게임의 목표는 가장 왼쪽 위 칸에서 가장 오른쪽 아래 칸으로 규칙에 맞게 점프를 해서 가는 것이다.

**각 칸에 적혀있는 수는 현재 칸에서 갈 수 있는 거리를 의미**한다. **반드시 오른쪽이나 아래쪽으로만 이동**해야 한다. **0은 더 이상 진행을 막는 종착점**이며, 항상 현재 칸에 적혀있는 수만큼 오른쪽이나 아래로 가야 한다. **한 번 점프를 할 때, 방향을 바꾸면 안 된다.** 즉, 한 칸에서 오른쪽으로 점프를 하거나, 아래로 점프를 하는 두 경우만 존재한다.

가장 왼쪽 위 칸에서 가장 오른쪽 아래 칸으로 **규칙에 맞게 이동할 수 있는 경로의 개수를 구하는 프로그램을 작성**하시오.

</br>

**입력**

첫째 줄에 **게임 판의 크기 N** (4 ≤ N ≤ 100)이 주어진다. **그 다음 N개 줄에는 각 칸에 적혀져 있는 수가 N개씩 주어진다.** 칸에 적혀있는 수는 0보다 크거나 같고, 9보다 작거나 같은 정수이며, 가장 오른쪽 아래 칸에는 항상 0이 주어진다.

</br>

**출력**

**가장 왼쪽 위 칸에서 가장 오른쪽 아래 칸으로 문제의 규칙에 맞게 갈 수 있는 경로의 개수를 출력**한다. 경로의 개수는 263^(-1)보다 작거나 같다.

</br>

# 💡 **알고리즘 설계**

1. **변수 입력 처리 및 초기화**
    1. 게임 판의 크기를 입력 받은 후 게임 판 배열 생성하고, 경로의 수를 입력 받음
    2. dp 배열을 사용하여 각 칸까지 도달할 수 있는 경로의 수를 저장하도록 함.
    3. 시작 지점일 때, 경로의 개수는 1로 초기화.
2. **dp 테이블 채우기**
    1. 각 칸에서 오른쪽과 아래쪽으로 점프하여 도달할 수 있는 칸에 현재 경로 수를 더해줌
3. **결과 출력**
    1. 목표지점의 경로 수를 출력
  
</br>

# 💡코드

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // 게임 판의 크기
        int[][] gamepan = new int[n][n]; // 게임 판
        long[][] dp = new long[n][n]; // 각 칸까지의 경로 수를 저장할 DP 배열

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                gamepan[i][j] = sc.nextInt();
            }
        }

        dp[0][0] = 1; // 시작 지점 초기화

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == n - 1 && j == n - 1) continue; // 목표 지점은 더 이상 진행하지 않음
                int jump = gamepan[i][j];
                if (jump == 0) continue; // 0인 경우는 더 이상 진행할 수 없음

                if (i + jump < n) dp[i + jump][j] += dp[i][j]; // 아래로 점프
                if (j + jump < n) dp[i][j + jump] += dp[i][j]; // 오른쪽으로 점프
            }
        }

        System.out.println(dp[n - 1][n - 1]); // 목표 지점까지의 경로 수 출력
    }
}
```

</br>

# 💡 시간복잡도

O(N^2)

</br>

# 💡 막힌 이유

- dp를 구현하는 게 아직 미숙한 것 같다. **목표지점까지 도달할 수 있는 경로의 수를 구할 때마다 중간 중간 결과를 저장하여 전체 개수를 구하는 문제라는 점에 dp 문제**라는 것은 파악이 되었는데, 이를 어떤식으로 구현하는게 효율적일지는 잘 감을 잡지 못한 것 같다.
    - dp 문제를 많이 접하면서 구현에 대한 감 익히기
- 해당 칸에서 오른쪽이나 아래쪽으로만 이동할 수 있다는 조건을 어떻게 구현해야할 지 막막했다.
    - 반복문을 통해 다음과 같이 구현할 수 있다.

```java
if (i + jump < n) dp[i + jump][j] += dp[i][j]; // 아래로 점프
if (j + jump < n) dp[i][j + jump] += dp[i][j]; // 오른쪽으로 점프
```

</br>

# 💡 느낀점 or 기억할정보

- **시작지점 초기화를 1로 해주는 이유**
    - 시작 지점 `(0, 0)`의 경로 수가 1로 초기화되는 이유는, 시작 지점에서 출발하는 경로를 하나로 간주하기 때문. 즉, 출발 지점에서 출발하는 하나의 유효한 경로가 존재한다고 보는 것.
    - 만약 시작 지점에서 경로 수를 0으로 초기화하면, 시작 지점에서 출발하는 경로가 없다고 간주되므로 모든 경로 수가 0이 되어 올바른 결과를 얻을 수 없음
- **누적 되어야 하는 값을 dp 배열로 구현 (이 문제에선 목표 지점까지의 경로 수)**
    - 각 칸에서의 이동 경로 수를 더하면서 누적시킴
