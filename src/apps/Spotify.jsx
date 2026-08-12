import AppWindow from '../components/AppWindow'

export default function Spotify({ isOpen, onClose }) {
  return (
    <AppWindow isOpen={isOpen} onClose={onClose} title="Spotify" headerColor="#121212">
      <div className="bg-[#121212] min-h-full pb-8 flex flex-col items-center">
        <div className="px-4 pt-2 pb-4 w-full">
          <h2 className="text-white text-2xl font-bold">My Music</h2>
          <p className="text-[#B3B3B3] text-sm mt-1">What I listen to</p>
        </div>

        {/* Spotify Embed - replace the src with your own playlist or profile */}
        <div className="w-full px-4">
          <div className="rounded-xl overflow-hidden">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            />
          </div>
        </div>

        <div className="mt-6 px-4 w-full">
          <div className="bg-[#282828] rounded-xl p-4">
            <p className="text-[#B3B3B3] text-sm text-center">
              Replace the playlist URL above with your own Spotify playlist or profile embed.
            </p>
          </div>
        </div>
      </div>
    </AppWindow>
  )
}
