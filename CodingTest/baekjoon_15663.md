# 💡 **문제 분석 요약**

중복이 허용된 숫자들로 구성된 배열(arr)에서 중복되지 않는 수열(output)을 생성

# 💡 **알고리즘 설계**

- 배열 정렬
    - 중복된 숫자 쉽게 처리하기 위함
- sequence 함수 (백트래킹 함수)
    - 모든 가능한 수열을 생성하며 중복된 수열 제거
    - base case
        - 현재 깊이가 수열의 길이 ‘m’에 도달하면 현재까지 만든 수열을 결과에 추가
    - 수열 생성 및 백트래킹
        - `prev` → 현재 깊이에서 중복된 숫자가 사용되지 않도록 함
        - 각 숫자를 순서대로 선택하여 `output` 배열에 추가하고, 다음 깊이로 재귀 호출하여 수열 생성
        - 재귀 호출이 끝나면 `prev` 갱신 해주어 중복 방지, 다음 숫자 선택
        - `visited` 배열을 갱신하여 숫자의 사용 여부를 추적하고, 백트래킹 해야 되는 경우에 원상 복구

# **💡 코드**

```java
import java.util.*;
import java.io.*;

public class Main {

    static StringBuilder sb = new StringBuilder();
    static int n, m;
    static int[] arr;
    static int[] output;
    static boolean[] visited;
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken()); // 배열 크기
        m = Integer.parseInt(st.nextToken()); // 수열 길이

        arr = new int[n];
        st = new StringTokenizer(br.readLine());
        for(int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(arr); // 오름차순 정렬

        output = new int[m]; // 수열 저장 배열
        visited = new boolean[n]; // 방문 여부 저장 배열

        // 백트래킹을 통해 수열을 생성하고 결과를 sb에 저장
        sequence(0);
        System.out.print(sb.toString());
    }

    public static void sequence(int depth) {
        // 순열의 길이가 m이라면
        if (depth == m) {
            for (int i = 0; i < m; i++) {
                // 순열 sb에 저장
                sb.append(output[i]).append(' ');
            }
            sb.append('\n');
            return;
        }
        
        int prev = -1; // 이전 숫자 저장 변수 (중복 제거 위해)
        for (int i = 0; i < n; i++) {
            // 이전에 사용한 숫자와 다르며, 방문하지 않은 숫자라면
            if (prev != arr[i] && !visited[i]) {
                output[depth] = arr[i];
                prev = arr[i]; // 이전 숫자 현재 숫자로 갱신
                visited[i] = true; // 현재 숫자 사용으로 표시
                
                // 다음 depth로 재귀 호출
                sequence(depth + 1);
                
                visited[i] = false; // 백트래킹: 숫자 사용 취소
            }
        }
    }
}

```

# **💡시간복잡도**

- **정렬**: `O(n log n)`
- **백트래킹**: `O(n^m)`
- **전체 시간 복잡도** : `O(n^m)` (`n^m`이 `n log n`보다 훨씬 크기 때문)

# **💡 막힌 이유**

- prev 변수를 이용하여 이전 숫자를 저장해 중복된 수열을 방지한다는 발상을 하지 못했다.
- 출력 초과 → visited 배열을 추가하여 현재 깊이에서 이미 사용된 숫자를 추적한다. (출력 초과 방지)

# **💡 느낀점 or 기억할정보**

- 이 문제에서 백트래킹을 사용한 이유?
    - 주어진 문제에서 모든 가능한 수열을 탐색하되, 중복된 수열을 제거하기 위함.
    - 백트래킹은 재귀적으로 **모든 가능성을 탐색**하면서 **조건을 만족하지 않는 경로는 되돌아가는(백트랙킹하는) 알고리즘**
    - 이를 통해 불필요한 계산을 줄이고, 효율적으로 해를 구할 수 있다.
