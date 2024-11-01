
class Star_Cinema:
    hall_list = []
    
    def entry_hall(self, Hall):
        self.hall_list.append(Hall)
        
class Hall(Star_Cinema):
    def __init__(self, rows, cols, hall_no):
        super().__init__()
        self.rows = rows
        self.cols = cols
        self.hall_no = hall_no
        self.seats = {}
        self.show_list = []
        
        Star_Cinema.entry_hall(self)
        
    def entry_show(self, id, movie_name, time):
        show_info = (id, movie_name, time)
        self.show_list.append(show_info)
        
        seat_arrangement = [["Free" for _ in range(self.cols)] for _ in range(self.rows)]
        self.seats[id] = seat_arrangement
        
    def book_seats(self, id, seat_position):
        if id not in self.seats:
            print(f'Show ID {id} is not available.')
            return
        
        seat_arrangement = self.seats[id]
        
        for row, col in seat_position:
            if 0<=row<self.rows and 0<=col<self.cols:
                if seat_arrangement[row][col] == "Free":
                    seat_arrangement[row][col] = "Booked"
                    print(f'Seat at row {row} and column {col} is booked successfully')
                else:
                    print(f'Sorry! Seat at row {row} and column {col} is already booked.')
            else:
                print(f'Seat is not valid.')
            
    