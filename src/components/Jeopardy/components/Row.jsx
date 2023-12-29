function Row({ children, category }) {
    return (
        <div className="flex flex-col justify-between p-3 mt-auto h-full jeopardy-row">
            <div className='p-6 text-3xl font-semibold text-center text-background tracking-wide'>
                {category}
            </div>
            <div className="flex flex-col content-center">
                {children}
            </div>
        </div>
    );
}

export default Row;