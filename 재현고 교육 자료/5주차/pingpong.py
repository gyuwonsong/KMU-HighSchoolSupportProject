import turtle as t
import random
import time

# 5. 함수 선언
def right():
    if player.xcor() < 200:
        player.forward(10)
        
def left():
    if player.xcor() > -200:
        player.backward(10)

# 1. 기본 설정
t.bgcolor("lightpink") # 배경색 설정
t.setup(500, 700) # 창 크기 (픽셀 설정)

# 3. 플레이어 생성
player = t.Turtle()
player.shape("square") # 플레이어의 모양 설정
player.shapesize(1, 5) # 플레이어의 크기
player.up() # 펜을 들어줌 (그림 그리기 X)
player.speed(0) # 속도 최대
player.goto(0, -270) # 위치 아랫쪽으로 설정

# 6. 공 설정
ball = t.Turtle()
ball.shape("circle") # 공의 모양 설정
ball.shapesize(1.3) # 공의 크기
ball.up() # 펜을 들어줌 (그림 그리기 X)
ball.speed(0) # 속도 최대
ball.color("white") # 색상 설정 

# 4. 플레이어의 키보드 이벤트 설정
t.listen()
t.onkeypress(right, "Right") # 오른쪽 방향키 클릭 시 right 함수
t.onkeypress(left, "Left") # 왼쪽 방향키 클릭 시 left 함수

# 7. 공의 움직임 이벤트 설정
game_on = True

ball_xspeed = 5
ball_yspeed = 5

# 8. 점수 변수, 목숨값 변수 추가
life = 3
t.up()
t.ht()
t.goto(0, 300)
t.write(f"life : {life}", False, "center", ("", 20))

while game_on:
    new_x = ball.xcor() + ball_xspeed # 현재 좌표값에서 조금씩 변화 -> 새로운 x 좌표
    new_y = ball.ycor() + ball_yspeed # 현재 좌표값에서 조금씩 변화 -> 새로운 y 좌표
    ball.goto(new_x, new_y) # 해당 위치로 이동
    
    if ball.xcor() > 240 or ball.xcor() < -240:
        ball_xspeed *= -1 # 오른쪽 벽에 닿았을 때는 +5 -> -5/ 그 반대도 동시에 가능
    
    if ball.ycor() > 340: # 천장에 닿았을 때에 대한 처리
        ball_yspeed *= -1
        
    if ball.ycor() < -340: # 바닥에 닿았을 때에 대한 처리 (공을 놓친 경우)
        # 8번 진행 후 추가 (라이프 변수에 대한 이프문도)
        life -= 1
        t.clear()
        t.write(f"life : {life}", False, "center", ("", 20))
        
        time.sleep(0.5) # 시간 딜레이
        ball.goto(0,100)
        ball_xspeed *= -1 # 반대 방향으로 쏘아올리도록
        ball_yspeed *= -1
        
        if life == 0:
            game_on = False
            t.goto(0, 0)
            t.write("Game Over", False, "center", ("", 20))
            
    # 플레이어 - 볼 감지    
    if player.distance(ball) < 50 and -260 < ball.ycor() < -245: # 뒷 조건 추가
        ball_yspeed *= -1
        
    
# 2. 창 바로 안닫히게 설정
t.mainloop()