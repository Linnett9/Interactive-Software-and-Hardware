import tkinter as tk
from tkinter import Label, Entry, Button, PhotoImage, filedialog
import requests
import openai
from PIL import Image, ImageTk
import io
import os 

# OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

current_image = None  # Global variable to hold the current image

def generate_image(prompt):
    global current_image
    response = openai.Image.create(
        prompt=prompt, 
        n=1, 
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    image = download_image(image_url)
    current_image = image._PhotoImage__photo  # Save the PhotoImage object for later use
    return image

def download_image(url):
    response = requests.get(url)
    image = Image.open(io.BytesIO(response.content))
    return ImageTk.PhotoImage(image)

def save_image():
    global current_image
    if current_image is not None:
        file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])
        if file_path:
            current_image.write(file_path, format="png")

def on_generate_button_clicked():
    prompt = text_entry.get()
    image = generate_image(prompt)
    image_label.config(image=image)
    image_label.image = image 

# Main window
root = tk.Tk()
root.title("Ai Art Generator")

# label, entry, and button for generating image
prompt_label = Label(root, text="Describe a masterpiece and it will come to life!")
prompt_label.pack()

text_entry = Entry(root, width=50)
text_entry.pack()

generate_button = Button(root, text="Create", command=on_generate_button_clicked)
generate_button.pack()

# Button for saving the image
save_button = Button(root, text="Save Image", command=save_image)
save_button.pack()

# Create a label for displaying the image
image_label = Label(root)
image_label.pack()

root.mainloop()

