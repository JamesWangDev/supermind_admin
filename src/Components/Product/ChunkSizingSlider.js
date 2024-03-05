const ChunkSizingSlider = ({ chunkSize, handleSliderMovement }) => {
    return (
        <div className="ChunkSizingSlider">
        <div className="mt-3 text-center">Select chunk size.</div>
        <div className="chunk-range p-4">
            <input 
                className="w-full accent-indigo-600" 
                type="range" 
                value={chunkSize} 
                min="1" 
                max="1024" 
                onInput={e => handleSliderMovement(e)}
            />
        </div>
        <div>
            Chunk size {chunkSize}
        </div>
    </div>
    )
}

export default ChunkSizingSlider