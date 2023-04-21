import React from 'react';

type SearchBarProps = {
    setQuery: React.Dispatch<React.SetStateAction<string>>,
};

export default function Searchbar({setQuery}: SearchBarProps) {
    return (
        <div className='ml-10 flex flex-col w-3/5'>
            <label htmlFor="search" className='text-gray-400'>Search by Author or Post</label>
            <input type="text" id='search' className='h-10 rounded-lg mt-2 pl-2' placeholder='Search any post' onChange={e => setQuery(e.target.value)}/>
        </div>
    )
}
