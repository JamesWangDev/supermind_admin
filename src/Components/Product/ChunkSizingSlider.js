const ChunkSizingSlider = ({ chunkSize, handleSliderMovement }) => {
    return (
        <div className="chunk-sizing-slider">
        <div className="chunk-sizing-label">Select chunk size.</div>
        <div className="chunk-range">
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