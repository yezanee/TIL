# 💡**문제 분석 요약**

문자열 처리 문제

# 💡**알고리즘 설계**

### 1. 입력 및 초기화

- 공통 데이터 타입 추출
    - 문자열을 읽어와서 공백으로 분리하여 첫 번째 부분을 공통 데이터 타입으로 저장
- 변수 선언 분리
    - 공통 데이터 타입 이후의 부분을 추출하여 쉼표(`,`)와 세미콜론(`;`)을 기준으로 각 변수 선언을 분리
    - `StringBuilder`와 `List` 사용

### 2. 변수명 및 타입 분리

- 변수명과 추가적인 변수형 구분
    - 각 변수 선언에서 문자(`a-z`, `A-Z`, `_`, `0-9`)가 아닌 첫 번째 문자의 인덱스를 찾아 변수명과 추가적인 변수형을 구분합니다.
    - `for` 루프를 사용하여 문자열 검사
- 추가적인 변수형 역순으로 처리
    - 추가적인 변수형을 역순으로 처리하되, 대괄호(`[]`)는 순서를 유지해야 하므로 특별히 처리

### 3. 결과 출력

- 공통 데이터 타입, 역순으로 처리된 추가적인 변수형, 그리고 변수명을 조합하여 출력
- 각 변수 선언은 세미콜론(`;`)으로 끝남

# 💡코드

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine().trim(); // 입력된 문자열을 읽고, 앞뒤 공백 제거
        
        String init = ""; // 공통 데이터 타입을 저장할 변수
        List<String> v = new ArrayList<>(); // 변수 선언들을 저장할 리스트
        StringBuilder temp = new StringBuilder(); // 임시로 문자열을 저장
        
        // 입력된 문자열을 한 글자씩 순회
        for (int i = 0; i < s.length(); i++) {
            // 공백을 만나면 공통 데이터 타입을 저장
            if (s.charAt(i) == ' ') {
                init = temp.toString();
                temp.setLength(0); // temp를 초기화
                continue; // 다음 문자로 이동
            }
            // 쉼표를 만나면 하나의 변수 선언을 리스트에 추가
            else if (s.charAt(i) == ',') {
                v.add(temp.toString()); // temp에 저장된 변수를 리스트에 추가
                i++; // 쉼표 다음 글자로 이동
                temp.setLength(0); // temp를 초기화
            }
            // 세미콜론을 만나면 하나의 변수 선언을 리스트에 추가
            else if (s.charAt(i) == ';') {
                v.add(temp.toString()); // temp에 저장된 변수를 리스트에 추가
                temp.setLength(0); // temp를 초기화
            }
            // 그 외의 문자들은 temp에 추가
            else {
                temp.append(s.charAt(i));
            }
        }

        // 리스트에 저장된 각 변수를 처리
        for (int i = 0; i < v.size(); i++) {
            String variable = v.get(i); // 리스트에서 변수 선언을 가져옴
            int idx = -1; // 변수명과 추가적인 변수형을 구분할 인덱스
            
            // 변수 선언에서 문자와 기호를 구분
            for (int j = 0; j < variable.length(); j++) {
                if (!Character.isLetter(variable.charAt(j))) {
                    idx = j; // 문자 외의 기호가 나오는 첫 번째 인덱스를 저장
                    break; // 루프 종료
                }
            }

            System.out.print(init); // 공통 데이터 타입을 출력
            // 추가적인 변수형이 없는 경우
            if (idx == -1) {
                System.out.println(" " + variable + ";"); // 변수명만 출력
            }
            // 추가적인 변수형이 있는 경우
            else {
                // 추가적인 변수형을 역순으로 출력
                for (int j = variable.length() - 1; j >= idx; j--) {
                    // 대괄호 순서는 맞추기 위해 특별히 처리
                    if (variable.charAt(j) == ']') {
                        System.out.print("[]");
                        j--; // '[' 문자를 건너뜀
                        continue;
                    }
                    System.out.print(variable.charAt(j)); // 역순으로 출력
                }
                System.out.print(" ");
                // 변수명을 출력합니다.
                for (int j = 0; j < idx; j++) {
                    System.out.print(variable.charAt(j));
                }
                System.out.println(";"); // 세미콜론으로 끝맺음
            }
        }
    }
}

```


참고 : https://jaimemin.tistory.com/1195

# 💡시간복잡도

O(n)

# 💡 틀린 이유

- 문자열 입력 후 분리하는 과정에서 어려움을 느낌 → 자바 문자열 처리 부분 추가적으로 공부하기
- 결과를 저장하고 처리하는 데 적합한 자료구조 못 찾음 → 리스트와 배열, StringBuilder 등 추가적으로 공부

# 💡 느낀점 or 기억할정보

- `trim()`
    - 문자열의 불필요한 앞, 뒤 공백을 제거
    - 가운데 공백은 제거 안함
- `toString()`
    - 객체가 가지고 있는 정보나 값들을 문자열로 만들어 리턴
    - 애초에 문자열이면 자신이 가진 값 그대로 리턴
- `StringBuilder`
    - 문자열 자주 수정할 때 성능 최적화
    - 공식문서 : https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html
- `ArrayList`
    - 인덱스 통해 요소에 빠르게 접근 가능
    - 내부적으로 배열의 크기 동적으로 조절 가능
    - 배열과 비슷하면서도 배열의 단점 보완 → 간단 ~
    - 이 문제에서 ArrayList 사용한 이유
        - **가변 크기**: 입력 문자열에서 변수 선언을 추출할 때, 몇 개의 변수가 있을지 알 수 없음. 이를 사용하면 필요한 만큼 요소를 추가 가능
        - **간편한 삽입**: 변수 선언을 쉼표(`,`)나 세미콜론(`;`) 기준으로 분리하여 리스트에 추가할 때, 요소 삽입 간편
