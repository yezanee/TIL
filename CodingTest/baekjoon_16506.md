# 💡**문제 분석 요약**

구현 문제!

민호가 직접 설계한 16-bit CPU의 명령어 구조 표를 보고, 어셈블리어 코드가 주어졌을 때 이를 기계어 코드로 번역하는 어셈블러를 만들어보자.

### 명령어 구조

- **Bit 위치 및 의미**:
    - `0~4`: opcode (연산을 나타내는 5-bit 코드)
    - `5`: 사용하지 않는 bit (항상 0)
    - `6~8`: rD (결과를 저장하는 레지스터의 번호)
    - `9~11`: rA (연산에 사용되는 레지스터의 번호, 사용하지 않을 경우 000)
    - `12~15`:
        - `4번 bit가 0`: rB (연산에 사용되는 레지스터의 번호, 15번 bit는 항상 0)
        - `4번 bit가 1`: 상수 #C (4-bit 상수)

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
import java.io.BufferedReader;
import java.io.IOException; 
import java.io.InputStreamReader; 
import java.util.HashMap; 
import java.util.StringTokenizer; 

public class Main {
    static HashMap<String, String> hm = new HashMap<>(); // 명령어(opcode)와 해당 4비트 2진수를 매핑하는 해시맵

    public static void main(String[] args) throws IOException {
        // 해시맵 hm에 명령어와 해당하는 4비트 2진수를 저장
        hm.put("ADD", "0000");
        hm.put("SUB", "0001");
        hm.put("MOV", "0010");
        hm.put("AND", "0011");
        hm.put("OR", "0100");
        hm.put("NOT", "0101");
        hm.put("MULT", "0110");
        hm.put("LSFTL", "0111");
        hm.put("LSFTR", "1000");
        hm.put("ASFTR", "1001");
        hm.put("RL", "1010");
        hm.put("RR", "1011");
        
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); 
        int n = Integer.parseInt(br.readLine()); // 명령어의 개수
        StringBuilder sb = new StringBuilder(); 
        while (n-- > 0) { 
            StringTokenizer st = new StringTokenizer(br.readLine()); 
            String opcode = st.nextToken(); // 첫 번째 토큰은 명령어 (opcode)
            int rD = Integer.parseInt(st.nextToken()); // 두 번째 토큰은 목적지 레지스터 (rD)
            int rA = Integer.parseInt(st.nextToken()); // 세 번째 토큰은 소스 레지스터 1 (rA)
            int rB = Integer.parseInt(st.nextToken()); // 네 번째 토큰은 소스 레지스터 2 또는 상수 (rB 또는 #C)
            if (opcode.charAt(opcode.length() - 1) == 'C') { // 명령어가 상수를 사용하는지 확인 (마지막 문자가 'C'인지 확인)
                sb.append(hm.get(opcode.substring(0, opcode.length() - 1))).append("1"); // 'C'를 제외한 명령어 코드에 '1' 추가
            } else {
                sb.append(hm.get(opcode)).append("0"); // 명령어 코드에 '0' 추가
            }
            sb.append("0"); // 사용하지 않는 비트 추가 (항상 0)

            String binary = Integer.toBinaryString(rD); // rD를 2진수 문자열로 변환
            String s = append(0, binary, 2); // rD를 3비트로 맞춰서 추가 (사용할 변수를 s로 저장)
            sb.append(append(0, binary, 2)); // rD를 3비트로 맞춰서 sb에 추가
            
            // 특정 명령어는 rA를 사용하지 않음
            if (opcode.equals("NOT") || opcode.equals("MOV") || opcode.equals("MOVC")) {
                sb.append("000"); // rA를 사용하지 않으므로 3비트 000 추가
            } else {
                String binary1 = Integer.toBinaryString(rA); // rA를 2진수 문자열로 변환
                sb.append(append(0, binary1, 2)); // rA를 3비트로 맞춰서 sb에 추가
            }
            String binary2 = Integer.toBinaryString(rB); // rB를 2진수 문자열로 변환
            if (opcode.charAt(opcode.length() - 1) == 'C') { // 명령어가 상수를 사용하는지 확인
                sb.append(append(0, binary2, 3)); // 상수는 4비트로 맞춰서 추가
            } else {
                sb.append(append(0, binary2, 2)).append("0"); // rB는 3비트로 맞추고 마지막 비트는 0 추가
            }
            sb.append("\n"); // 명령어의 끝에 개행 문자 추가
        }
        System.out.println(sb); // 최종 결과 출력
    }

    // 주어진 문자열을 지정된 길이로 맞추기 위해 왼쪽에 0을 추가하는 재귀 함수
    private static String append(int depth, String str, int limit) {
        if (depth >= limit || limit < str.length()) { // 재귀 종료 조건: depth가 limit 이상이거나, str의 길이가 limit 이상인 경우
            return str; // 현재 문자열 반환
        }
        return append(depth + 1, "0" + str, limit); // 왼쪽에 0을 추가한 문자열로 재귀 호출
    }
}
```

# 💡시간복잡도

O(n * m)

# 💡 느낀점 or 기억할정보

- 구현 문제는 문제를 분석하는데 시간이 오래걸리는 거 같다 적절한 제한시간 두고 풀어보는 게 좋을듯
- 해시맵(HashMap)
    - 키-값 쌍(key-value pairs)을 저장하는 자료 구조
    - 빠른 접근 속도 : 해시맵은 내부적으로 배열과 해시 함수를 사용하여 데이터를 저장하고 검색
    - 무순서 (순서가 중요한 경우 LinkedHashMap 사용)
    - 중복 키 미허용 (값은 중복 가능)
    - 이 문제에서 해시맵 사용 이유 : 명령어와 2진수 코드의 빠른 매핑 (`hm.put("ADD", "0000");`)
