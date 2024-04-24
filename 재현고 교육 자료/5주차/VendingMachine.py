menu = ['라면', '계란', '츄러스', '식혜']
price = [3500, 1500, 2000, 2000]
money = int(input('돈을 투입하세요 : '))

while True:
    print('** 자판기 판매 메뉴 **')
    
    for i in range(len(menu)):
        print(i + 1 , ":" , menu[i] , price[i])
    
    choice = int(input('메뉴 선택 (종료는 0 입력) : '))
    
    if(choice == 0):
        print()
        print('잔돈 반환 : ', money)
        print('이용해 주셔서 감사합니다 :)')
        break
    
    else:
        if money >= price[choice - 1]:
            print()
            print(menu[choice - 1], '구입 완료')
            money -= price[choice - 1]
            print('잔액 : ', money)
            print()
        else:
            print('잔액 부족')
            print()