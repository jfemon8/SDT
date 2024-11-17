class Star_Cinema:
    _hall_list = []  
    
    def entry_hall(cls, hall):
        cls._hall_list.append(hall)


class Hall(Star_Cinema):
    def __init__(self, rows, cols, hall_no):
        super().__init__()
        self.__rows = rows         
        self.__cols = cols         
        self.__hall_no = hall_no   
        self.__seats = {}          
        self.__show_list = []      
        
        Star_Cinema.entry_hall(self, self.__hall_no)

    def entry_show(self, id, movie_name, time):
       
        show_info = (id, movie_name, time)
        self.__show_list.append(show_info)

        seat_arrangement = [["Free" for _ in range(self.__cols)] for _ in range(self.__rows)]
        self.__seats[id] = seat_arrangement

    def book_seats(self, id, seat_position):
       
        if id not in self.__seats:
            print(f'Show ID {id} is not available.')
            return False

        seat_arrangement = self.__seats[id]
        success = True

        for row, col in seat_position:
            if 0 <= row < self.__rows and 0 <= col < self.__cols:
                if seat_arrangement[row][col] == "Free":
                    seat_arrangement[row][col] = "Booked"
                    print(f'Seat at row {row} and column {col} is booked successfully.')
                else:
                    print(f'Sorry! Seat at row {row} and column {col} is already booked.')
                    success = False
            else:
                print(f'Seat position ({row}, {col}) is not valid.')
                success = False
        return success

    def view_show_list(self):
        
        for id, movie_name, time in self.__show_list:
            print(f'Show ID: {id} | Movie Name: {movie_name} | Time: {time}')

    def view_available_seats(self, id):
        
        if id not in self.__seats:
            print(f'Show ID {id} is not available.')
            return

        seat_arrangement = self.__seats[id]
        print(f"Available seats for Show ID {id}:")
        
        for row in range(self.__rows):
            for col in range(self.__cols):
                if seat_arrangement[row][col] == "Free":
                    print(f'Row {row}, Column {col} is available.')


class Counter:
    def __init__(self, hall):
        self._hall = hall  

    def view_running_shows(self):
        
        self._hall.view_show_list()

    def view_available_seats_in_show(self, id):
       
        self._hall.view_available_seats(id)

    def book_tickets(self, id, position):
        
        success = self._hall.book_seats(id, position)
        if success:
            print('All tickets have been booked successfully.')
        else:
            print('Some seats are not available. Please try different seats.')


hall1 = Hall(5, 5, "hall1")
hall1.entry_show(1, "Spider Man", "03:00 PM")
counter1 = Counter(hall1)

while True:
    print('1. View all shows')
    print('2. View available seats')
    print('3. Book ticket')
    print('4. Exit')
    n = int(input('Please enter an option: '))
    if n == 1:
        counter1.view_running_shows()
    elif n == 2:
        s = int(input('Please enter show id: '))
        counter1.view_available_seats_in_show(s)
    elif n == 3:
        s_id = int(input('Please enter the show id: '))
        r, c = map(int, input('Please enter the row and the column: ').split())
        counter1.book_tickets(s_id, [(r, c)])
    elif n == 4:
        print("Exiting...")
        break
    else:
        print("Invalid option. Please try again.")
