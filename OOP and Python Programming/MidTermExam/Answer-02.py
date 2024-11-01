
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
        self.seat = {}
        self.show_list = []
        
        Star_Cinema.entry_hall(self)
        
