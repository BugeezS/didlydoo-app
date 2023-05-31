export async function sendAttendanceInfo(eventId, name, dates) {
    const url = `http://localhost:3000/api/events/${eventId}/attend`;
    const payload = { name, dates };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        console.log('Attendance information sent successfully');
      } else {
        console.error('Failed to send attendance information');
      }
    } catch (error) {
      console.error('An error occurred while sending attendance information:', error);
    }
  }
  