# 💡**문제 분석 요약**

 지민이의 새로운 모니터를 위해 테스트 할 수 있는 프로그램을 만들기로 함

**입력**

- 정수 s : 크기 (1 ≤ s ≤ 10)
- 정수 n : LCD 모니터에 나타내야 할 수 (0 ≤ n ≤ 9,999,999,999)

**출력**

- 길이가 s인 '`-`'와 '`|`'를 이용해서 출력 (모니터에 표현)
- 각 숫자는 모두 s+2의 가로와 2s+3의 세로로 이루어 짐
- 나머지는 공백으로 채움
- 각 숫자 사이에는 공백이 한칸 있어야 함

# 💡**알고리즘 설계**

- **명령어 초기화**: 각 명령어를 4비트 2진수 문자열로 매핑
- **입력 받기**: 명령어의 개수를 입력받고, 각 명령어 줄을 읽어들임
- **명령어 파싱 및 변환**:
    - 명령어와 레지스터, 상수를 파싱
    - 명령어 타입에 따라 적절한 비트 패턴을 생성
    - 생성된 비트 패턴을 `StringBuilder`에 추가
- **출력**: 최종 변환된 기계어 코드를 출력

# 💡코드

```java
import java.util.*;
import java.io.*;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        int s = Integer.parseInt(st.nextToken()); // 크기
        String n = st.nextToken(); // 디스플레이에 나타내야 할 수
        
        // 각 숫자에 해당하는 세그먼트 디스플레이의 패턴 저장 배열
        // 각 문자는 해당 세그먼트가 켜져 있는 지를 나타냄 ('1' : on, '0' : off)
        String[] segments = {
            "1110111", // 0
            "0010010", // 1
            "1011101", // 2
            "1011011", // 3
            "0111010", // 4
            "1101011", // 5
            "1101111", // 6
            "1010010", // 7
            "1111111", // 8
            "1111011"  // 9
        };

        int height = 2 * s + 3; // 총 높이
        int width = s + 2; // 각 숫자의 폭

        StringBuilder[] sb = new StringBuilder[height];
        // 세그먼트 디스플레이는 여러 줄로 이루어져 있다.
        // 각 줄에 해당하는 문자열을 별도로 관리하기 위해 배열을 이용한다.
        // 마지막에 모두 결합
        
        for (int i = 0; i < height; i++) {
            sb[i] = new StringBuilder();
        }
        // 각 배열의 요소를 StringBuilder 객체로 초기화
        // 자바에서 객체 배열을 선언하면 배열 요소는 기본적으로 null로 초기화 되기 때문
        // NullPointerException 발생 방지
        
        // 각 숫자를 처리하고, 숫자 간에 공백을 추가
        for (int i = 0; i < n.length(); i++) {
            if (i > 0) { // 첫번째 숫자가 아닌 경우에만 실행
                for (int j = 0; j < height; j++) {
                    sb[j].append(" "); // 각 숫자 사이에 공백 추가
                }
            }
            String numSegment = segments[n.charAt(i) - '0'];
            // 현재 숫자를 변수로 변환
            appendNumber(sb, numSegment, s, width);
            // 현재 숫자를 디스플레이 형식으로 sb에 추가
        }

        for (StringBuilder row : sb) {
            System.out.println(row.toString());
        }
        // sb 배열에 저장된 각 줄을 출력
    }
    
    // 숫자를 세그먼트 디스플레이로 변환하여 sb 배열에 추가하는 함수
    static void appendNumber(StringBuilder[] sb, String numSegment, int s, int width) {
        for (int i = 0; i < sb.length; i++) { // 각 줄을 순회하며 세그먼트 추가
            
            // 상단
            if (i == 0) {
                sb[i].append(" "); // 줄 처음에 공백 추가
                for (int j = 0; j < s; j++) sb[i].append(numSegment.charAt(0) == '1' ? "-" : " ");
                // 상단 세그먼트가 켜져있는 지 확인하고,
                // 켜져 있으면 "-" 추가
                // 꺼져 있으면 " "(공백) 추가
                // 세그먼트의 길이 만큼 반복
                sb[i].append(" "); // 줄 마지막에 공백 추가
            }
            
            // 상단 세로
            else if (i > 0 && i < s + 1) {
                sb[i].append(numSegment.charAt(1) == '1' ? "|" : " ");
                // 왼쪽 상단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "|" 추가
                // 꺼져 있으면 " "(공백) 추가
                for (int j = 0; j < s; j++) sb[i].append(" ");
                // 세로 세그먼트 사이에 공백 추가
                sb[i].append(numSegment.charAt(2) == '1' ? "|" : " ");
                // 오른쪽 상단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "|" 추가
                // 꺼져 있으면 " "(공백) 추가
            }
            
            // 중단
            else if (i == s + 1) {
                sb[i].append(" "); // 줄의 처음에 공백 추가
                for (int j = 0; j < s; j++) sb[i].append(numSegment.charAt(3) == '1' ? "-" : " ");
                // 중단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "-" 추가
                // 꺼져 있으면 " "(공백) 추가
                sb[i].append(" "); // 줄의 마지막에 공백 추가
            }
            
            // 하단 세로
            else if (i > s + 1 && i < 2 * s + 2) {
                sb[i].append(numSegment.charAt(4) == '1' ? "|" : " ");
                // 왼쪽 하단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "|" 추가
                // 꺼져 있으면 " "(공백) 추가
                for (int j = 0; j < s; j++) sb[i].append(" "); // 세로 세그먼트 사이에 공백 추가
                sb[i].append(numSegment.charAt(5) == '1' ? "|" : " ");
                // 오른쪽 하단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "|" 추가
                // 꺼져 있으면 " "(공백) 추가
            }
            
            // 하단
            else if (i == 2 * s + 2) {
                sb[i].append(" "); // 줄 처음에 공백 추가
                for (int j = 0; j < s; j++) sb[i].append(numSegment.charAt(6) == '1' ? "-" : " ");
                // 하단 세그먼트가 켜져있는지 확인
                // 켜져 있으면 "-" 추가
                // 꺼져 있으면 " "(공백) 추가
                sb[i].append(" "); // 줄 마지막에 공백 추가
            }
        }
    }
}

```

# 💡시간복잡도

O(n * m)

# 💡 느낀점 or 기억할정보

### 1. 세그먼트 디스플레이 구성 이해

```css
  --a--
 |     |
 f     b
 |     |
  --g--
 |     |
 e     c
 |     |
  --d--
```

- `a`: 상단
- `b`: 상단 오른쪽 세로
- `c`: 하단 오른쪽 세로
- `d`: 하단
- `e`: 하단 왼쪽 세로
- `f`: 상단 왼쪽 세로
- `g`: 중단

### 2. StringBuilder 배열을 사용하는 이유?

- `StringBuilder`는 문자열을 조작할 때 유용한 클래스다. `String` 객체는 불변(immutable)이라서 문자열을 변경할 때마다 새로운 객체가 생성된다. 이는 반복적으로 문자열을 추가하거나 수정할 때 비효율적일 수 있다. 반면, `StringBuilder`는 가변(mutable) 객체로, 문자열을 변경할 때 내부 버퍼를 사용하여 효율적으로 처리할 수 있습니다.
- `StringBuilder` 배열을 사용하는 이유는 각 줄(row)에 해당하는 문자열을 별도로 관리하기 위해서이다. 세그먼트 디스플레이는 여러 줄로 이루어져 있으므로 각 줄을 독립적으로 조작하고 마지막에 모두 결합하는 것이 효율적이다.
- 왜 배열의 각 요소를 초기화해야 하는가?
    - 자바에서 객체 배열을 선언하면, 배열 요소는 기본적으로 `null`로 초기화된다.
    - 이를 사용하기 위해서는 각 요소를 실제 객체로 초기화 해야한다.
    - 그렇지 않으면 `NullPointerException`이 발생할 수 있다.

### 3. 세그먼트 배열을 따로 정의해서 구현한 이유?

- **가독성 및 유지 보수성**: 세그먼트를 배열로 정의하면 각 숫자가 어떤 세그먼트를 사용하는지 명확히 볼 수 있다. 따라서 코드의 가독성이 높아지고, 유지 보수하기도 쉬워진다. 새로운 숫자 패턴을 추가하거나 기존 패턴을 수정할 때 한 곳에서 변경하면 되기 때문에 편리하다.
- **효율성**: 각 숫자의 세그먼트를 미리 정의해두면 숫자를 출력할 때마다 조건문을 사용하여 세그먼트를 계산할 필요가 없다. 미리 정의된 배열을 참조하기만 하면 되므로 효율적이다.
- **일관성**: 문제마다 세그먼트를 사용하는 패턴이 있다면, 이를 배열로 정의하여 일관성 있게 사용할 수 있습니다. 예를 들어, 7 세그먼트 디스플레이는 특정한 방식으로 숫자를 표시하므로 이를 배열로 정의하여 일관된 방식으로 처리할 수 있다.
