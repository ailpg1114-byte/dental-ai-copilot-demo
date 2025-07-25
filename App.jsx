import React, { useState } from 'react'

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m your Dental AI Copilot. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newMessages
        })
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🦷 Dental AI Copilot</h2>
      <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: 300 }}>
        {messages.length > 0 ? (
  messages.map((msg, i) => (
    <div key={i} style={{ marginBottom: '1rem' }}>
      <strong>{msg.role === 'user' ? 'You' : 'Copilot'}:</strong> {msg.content}
    </div>
  ))
) : (
  <div>No messages yet — React is working ✅</div>
)}
        {loading && <div>Copilot is thinking...</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your question..."
        style={{ width: '80%', padding: '0.5rem', marginTop: '1rem' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Send
      </button>
    </div>
  )
}
export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🦷 Dental AI Copilot</h1>
      <p style={{ color: "green" }}>✅ React is mounted</p>

      {/* Your existing chatbot code here */}
    </div>
  );
}


