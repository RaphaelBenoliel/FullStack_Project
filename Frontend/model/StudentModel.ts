export type Student = {
    name: string,
    id: string,
    imgUrl: string
}
const data: Student[] = [
    {
        name: 'John Doe',
        id: '12345',
        imgUrl: 'https://www.w3schools.com/w3images/avatar2.png'
    },
    {
        name: 'Jane Doe',
        id: '67890',
        imgUrl: 'https://www.w3schools.com/w3images/avatar6.png'
    },
    {
        name: 'Alice Cooper',
        id: '54321',
        imgUrl: 'https://www.w3schools.com/w3images/avatar5.png'
    },
    {
        name: 'Bob Smith',
        id: '09876',
        imgUrl: 'https://www.w3schools.com/w3images/avatar4.png'
    },
    {
        name: 'Eve Jackson',
        id: '13579',
        imgUrl: 'https://www.w3schools.com/w3images/avatar3.png'
    },
    {
        name: 'Mallory Johnson',
        id: '24680',
        imgUrl: 'https://www.w3schools.com/w3images/avatar1.png'
    },
    {
        name: 'Trent Reznor',
        id: '98765',
        imgUrl: 'https://www.w3schools.com/w3images/avatar2.png'
    },
    {
        name: 'Wiz Cooper',
        id: '54421',
        imgUrl: 'https://www.w3schools.com/w3images/avatar5.png'
    },
    {
        name: 'Alen Smith',
        id: '29876',
        imgUrl: 'https://www.w3schools.com/w3images/avatar4.png'
    },
    {
        name: 'Eli Jackson',
        id: '13879',
        imgUrl: 'https://www.w3schools.com/w3images/avatar3.png'
    },
    {
        name: 'Merd Johnson',
        id: '24689',
        imgUrl: 'https://www.w3schools.com/w3images/avatar1.png'
    },
    {
        name: 'Trent Oznor',
        id: '98165',
        imgUrl: 'https://www.w3schools.com/w3images/avatar2.png'
    },
    {
        name: 'Arnold Cooper',
        id: '54323',
        imgUrl: 'https://www.w3schools.com/w3images/avatar5.png'
    },
    {
        name: 'Rene Smith',
        id: '59876',
        imgUrl: 'https://www.w3schools.com/w3images/avatar4.png'
    },
    {
        name: 'Solki Jackson',
        id: '12579',
        imgUrl: 'https://www.w3schools.com/w3images/avatar3.png'
    },
    {
        name: 'Gims Johnson',
        id: '24681',
        imgUrl: 'https://www.w3schools.com/w3images/avatar1.png'
    },
    {
        name: 'Avi Reznor',
        id: '91765',
        imgUrl: 'https://www.w3schools.com/w3images/avatar2.png'
    },
    {
        name: 'Liam Cooper',
        id: '54221',
        imgUrl: 'https://www.w3schools.com/w3images/avatar5.png'
    },
    {
        name: 'Jim Smith',
        id: '19876',
        imgUrl: 'https://www.w3schools.com/w3images/avatar4.png'
    },
    {
        name: 'Michael Jackson',
        id: '13571',
        imgUrl: 'https://www.w3schools.com/w3images/avatar3.png'
    },
    {
        name: 'Kim Johnson',
        id: '24610',
        imgUrl: 'https://www.w3schools.com/w3images/avatar1.png'
    },
]

const getAllStudents = () : Student[] => {
    return data;
}

const getStudentById = (id: string) : Student | undefined => {
    return data.find((student) => student.id === id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index > -1) {
        data.splice(index, 1);
    }
}

export default {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudent
}
