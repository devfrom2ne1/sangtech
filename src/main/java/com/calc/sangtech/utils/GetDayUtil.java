package com.calc.sangtech.utils;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class GetDayUtil {
    public static void main(String[] args) {
        System.out.println("GetDayUtil의 main 진입");
    }

    public void util() {

        SimpleDateFormat dateFormat;
        //dateFormat = new SimpleDateFormat("yyyyMM"); //년월 표시
        dateFormat = new SimpleDateFormat("yyyyMMdd"); //년월일 표시

        Calendar cal = Calendar.getInstance();
        cal.set ( 2024, 5-1, 30 ); //종료 날짜 셋팅
        String endDate = dateFormat.format(cal.getTime());

        System.out.println("endDate : " + endDate);

        cal.set ( 2024, 3-1, 1 ); //시작 날짜 셋팅
        String startDate = dateFormat.format(cal.getTime());
        System.out.println("startDate : " + startDate);

        int i = 0;

        while(!startDate.equals(endDate)){ //다르다면 실행, 동일 하다면 빠져나감

            if(i==0) { //최초 실행 출력
                System.out.println("최초실행 : " + dateFormat.format(cal.getTime()));
            }

            //+1일
            cal.add(Calendar.DATE, 1); //1일 더해줌
            System.out.println("1일 더해줌 : " + dateFormat.format(cal.getTime()));

            // 월, 수, 금 만 찾기
            int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
            System.out.println("요일 : " + dayOfWeek);
            if(dayOfWeek == 2 || dayOfWeek == 4 || dayOfWeek == 6){
                System.out.println("db에 넣기!");
            }
            else{
                System.out.println("db에 안넣기!");
            }
            // 다음 loop 처리
            startDate = dateFormat.format(cal.getTime()); //비교를 위한 값 셋팅
            i++;
            System.out.println("-----------------------");

        }
    }
}
