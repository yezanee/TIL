# 💡**문제 분석 요약**

 주어진 5의 배수 길이의 시그널 문자열을 5개의 행으로 나누고, 각 열에서 숫자 패턴을 판별하여 숫자 문자열로 해독하는 문제

# 💡**알고리즘 설계**

- 문제에서 입력으로 주어진 시그널의 길이를 5줄로 나누고 시작
- 첫번째 줄 기준으로 숫자 판단.
    - 첫째 줄이 `“###”`으로 시작하면 0, 2, 3, 5, 6, 7, 8, 9
        - 해당 인덱스를 기준으로 5줄 3칸짜리 문자열을 만들어본다.
        - 미리 작성해둔 데이터와 비교
    - 아니라면 1이나 4중 하나
        - 1은 일직선으로 `#` , 4는 중앙이 `.` 으로 빈다.
        - 일직선 상의 마지막 줄 기준으로 봤을때 `#`이라면 1, `#`이 아니라 `.`이라면 4

# 💡코드

```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        int n = Integer.parseInt(br.readLine()); // 시그널 길이
        String str = br.readLine(); // 시그널

        int colLength = n / 5; // 시그널을 5개의 행으로 나누었을 때, 한 행의 길이
        char[][] signal = new char[5][colLength]; // 시그널의 2차원 배열
        
        for (int i = 0; i < 5; i++) { // 행
            for (int j = 0; j < colLength; j++) { // 열
                signal[i][j] = str.charAt(i * colLength + j);
            }
        }

        StringBuilder sb = new StringBuilder();
        int index = 0;

        // 시그널을 한 열씩 읽으며 숫자를 판별
        while (index < colLength) {
            if (signal[0][index] == '#') { // 숫자가 시작되는 열
                if (index + 2 < colLength && signal[0][index + 1] == '#' && signal[0][index + 2] == '#') {
                    // 0, 2, 3, 5, 6, 7, 8, 9 번 숫자를 판별
                    sb.append(converter(index, signal));
                    index += 3; // 숫자가 3열을 차지하므로 인덱스를 3만큼 이동
                    continue;
                } else if (signal[4][index] == '#') {
                    // 숫자 1 판별 (세로 선만 있음)
                    sb.append("1");
                    index += 1; // 숫자 1은 1열만 차지
                } else {
                    // 숫자 4 판별
                    sb.append("4");
                    index += 3; // 숫자 4는 3열을 차지
                }
            } else {
                index++; // 공백 열은 건너뜀
            }
        }

        // 판별된 숫자 출력
        System.out.println(sb.toString());
    }

    // 숫자를 판별하는 함수
    private static int converter(int index, char[][] signal) {
        StringBuilder sb = new StringBuilder();
        
        // 현재 위치에서 3열 동안의 패턴을 문자열로 저장
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 3; j++) {
                sb.append(signal[i][j + index]);
            }
        }

        // 각 숫자에 해당하는 패턴과 비교하여 숫자를 반환
        String pattern = sb.toString();
        switch (pattern) {
            case "####.##.##.####":
                return 0;
            case "###..#####..###":
                return 2;
            case "###..####..####":
                return 3;
            case "####..###..####":
                return 5;
            case "####..####.####":
                return 6;
            case "###..#..#..#..#":
                return 7;
            case "####.#####.####":
                return 8;
            case "####.####..####":
                return 9;
            default:
                return -1; // 패턴에 해당하는 숫자가 없는 경우
        }
    }
}

```

# 💡시간복잡도

O(n)

# 💡 느낀점 or 기억할정보

- LCD Test와 비슷한 느낌의 시뮬레이션
- 숨겨진 규칙을 발견해내는 게 중요한듯 구현문제 너무 어렵다 ..
