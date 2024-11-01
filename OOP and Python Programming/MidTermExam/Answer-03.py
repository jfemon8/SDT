
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
        
    

