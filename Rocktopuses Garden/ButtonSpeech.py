import serial
import pyttsx3
import speech_recognition as sr
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize text-to-speech engine
engine = pyttsx3.init()
engine.setProperty("rate", 100)

# Initialize serial communication with Arduino
ser = serial.Serial('/dev/ttyACM0', 115200)
ser.timeout = 1

def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:    
        print("Say something!")
        audio = r.listen(source)
        text = ""
        
        try:
            text = r.recognize_google(audio)
            print(text)
        except Exception as e:
            text = "Failed"
            print("Exception: " + str(e))
    return text

def get_answer(text):
    answer = ""
    completion = client.chat.completions.create(model = "gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": text}
        ])
    answer = completion.choices[0].message.content
    print(answer)
    return answer

def chat():
    query = get_audio()
    if query != "Failed":
        answer = get_answer(query)
        engine.say(answer)
        engine.runAndWait()
    else:
        engine.say("Cannot hear it, Please try again!")

art_explanations = {
    "1": "Description for Art Piece 1.",
    "2": "Description for Art Piece 2.",
}

while True:
    # Read the incoming line from the Arduino
    readedText = ser.readline().decode('UTF-8').rstrip()

    # Respond to specific commands from Arduino
    if readedText == "start":
        chat()
        ser.write(str("stop\n").encode('UTF-8'))
    elif readedText.startswith("Description of Art Piece"):

        art_piece_number = readedText.split()[-1]

        explanation = art_explanations.get(art_piece_number, "No description available for this art piece.")
        engine.say(explanation)
        engine.runAndWait()