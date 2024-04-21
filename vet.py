import tkinter as tk
from aima3.logic import *
from aima3.utils import *

kb = FolKB()

symptoms_list = [
    "Fever",
    "Coughing",
    "Diarrhea",
    "Vomiting",
    "Lameness",
    "SwellingInJoints",
    "Lethargy",
    "LossOfAppetite",
    "ExcessiveThirst",
    "ExcessiveUrination",
    "RednessInEyes",
    "DischargeInEyes",
    "Itching",
    "HairLoss",
    "Wheezing",
    "DifficultyBreathing"
]

diseases = [
    "RespiratoryInfection",
    "GastrointestinalIssues",
    "Arthritis",
    "SystemicIllness",
    "Diabetes",
    "Conjunctivitis",
    "SkinInfection",
    "Asthma",
    "SystemicIllness",
    "AutoimmuneDisease",
    "Lupus",
    "KidneyDisease",
    "Uveitis",
    "Dermatomyositis",
    "Bronchiolitis"
]

kb.tell(expr('Fever(x) & Coughing(x) ==> RespiratoryInfection(x)'))
kb.tell(expr('Diarrhea(x) & Vomiting(x) ==> GastrointestinalIssues(x)'))
kb.tell(expr('RespiratoryInfection(x) & GastrointestinalIssues(x) ==> SystemicIllness(x)'))
kb.tell(expr('Lameness(x) & SwellingInJoints(x) ==> Arthritis(x)'))
kb.tell(expr('Arthritis(x) & SystemicIllness(x) ==> AutoimmuneDisease(x)'))
kb.tell(expr('Lethargy(x) & LossOfAppetite(x) ==> SystemicIllness(x)'))
kb.tell(expr('AutoimmuneDisease(x) ==> Lupus(x)'))
kb.tell(expr('ExcessiveThirst(x) & ExcessiveUrination(x) ==> Diabetes(x)'))
kb.tell(expr('Diabetes(x) & Lupus(x) ==> KidneyDisease(x)'))
kb.tell(expr('RednessInEyes(x) & DischargeInEyes(x) ==> Conjunctivitis(x)'))
kb.tell(expr('Conjunctivitis(x) & Lupus(x) ==> Uveitis(x)'))
kb.tell(expr('Itching(x) & HairLoss(x) ==> SkinInfection(x)'))
kb.tell(expr('SkinInfection(x) & Uveitis(x) ==> Dermatomyositis(x)'))
kb.tell(expr('Wheezing(x) & DifficultyBreathing(x) ==> Asthma(x)'))
kb.tell(expr('Asthma(x) & Dermatomyositis(x) ==> Bronchiolitis(x)'))

symptomsClient = []
memory = {}
agenda = []

questions = [
    "Does your pet have fever?",
    "Is your pet coughing?",
    "Is your pet experiencing diarrhea?",
    "Is your pet vomiting?",
    "Is your pet limping or showing lameness?",
    "Does your pet have swelling in joints?",
    "Is your pet lethargic?",
    "Is your pet experiencing loss of appetite?",
    "Is your pet excessively thirsty?",
    "Is your pet urinating excessively?",
    "Does your pet have redness in eyes?",
    "Does your pet have discharge in eyes?",
    "Is your pet itching?",
    "Is your pet experiencing hair loss?",
    "Is your pet wheezing?",
    "Is your pet experiencing difficulty breathing?"
]

def ask_question(current_question_index=0):
    def next_question(response):
        if response:
            symptomsClient.append(symptoms_list[current_question_index.get()])
        add_to_conversation(f'You: {"Yes" if response else "No"}')
        current_question_index.set(current_question_index.get() + 1)
        if current_question_index.get() == len(questions):
            build_agenda()
            run_expert_system()
            show_results()
        else:
            add_to_conversation(f'Program: {questions[current_question_index.get()]}')

    root = tk.Tk()
    root.title("Symptom Checker")

    global conversation_history

    current_question_index = tk.IntVar(value=0)

    frame = tk.Frame(root)
    frame.pack(pady=10)

    conversation_history = tk.Text(frame, height=15, width=50, bg='lightgrey', wrap='word')
    conversation_history.grid(row=0, column=0, pady=5, padx=5, columnspan=2)

    yes_button = tk.Button(frame, text="Yes", command=lambda: next_question(True), width=10, height=2)
    yes_button.grid(row=1, column=0, padx=5, pady=5)

    no_button = tk.Button(frame, text="No", command=lambda: next_question(False), width=10, height=2)
    no_button.grid(row=1, column=1, padx=5, pady=5)

    add_to_conversation(f'Program: {questions[0]}')

    window_width = root.winfo_reqwidth()
    window_height = root.winfo_reqheight()
    position_right = int(root.winfo_screenwidth() / 2 - window_width / 2)
    position_down = int(root.winfo_screenheight() / 2 - window_height / 2)
    root.geometry(f"+{position_right}+{position_down}")

    root.mainloop()

def add_to_conversation(message):
    conversation_history.config(state=tk.NORMAL)
    conversation_history.insert(tk.END, message + '\n')
    conversation_history.config(state=tk.DISABLED)
    conversation_history.see(tk.END)

def build_agenda():
    agenda.clear()
    for symptom in symptomsClient:
        agenda.append(expr(f'{symptom}(x)'))

def run_expert_system():
    seen = set()
    while agenda:
        p = agenda.pop(0)
        if p in seen:
            continue
        seen.add(p)
        if fol_fc_ask(kb, p):
            memory[p] = True
            if p in [expr(f'{symptom}(x)') for symptom in symptoms_list]:
                for disease in diseases:
                    if p in [expr(f'{symptom}(x)') for symptom in symptoms_list if disease in symptoms_list]:
                        agenda.append(expr(f'{disease}(x)'))
        else:
            memory[p] = False
        
        if memory.get(expr('Fever(x)'), False) and memory.get(expr('Coughing(x)'), False):
            agenda.append(expr('RespiratoryInfection(x)'))
        if memory.get(expr('Diarrhea(x)'), False) and memory.get(expr('Vomiting(x)'), False):
            agenda.append(expr('GastrointestinalIssues(x)'))
        if memory.get(expr('RespiratoryInfection(x)'), False) and memory.get(expr('GastrointestinalIssues(x)'), False):
            agenda.append(expr('SystemicIllness(x)'))
        if memory.get(expr('Lameness(x)'), False) and memory.get(expr('SwellingInJoints(x)'), False):
            agenda.append(expr('Arthritis(x)'))
        if memory.get(expr('Lethargy(x)'), False) and memory.get(expr('LossOfAppetite(x)'), False):
            agenda.append(expr('SystemicIllness(x)'))
        if memory.get(expr('SystemicIllness(x)'), False) and memory.get(expr('Arthritis(x)'), False):
            agenda.append(expr('AutoimmuneDisease(x)'))
        if memory.get(expr('AutoimmuneDisease(x)'), False):
            agenda.append(expr('Lupus(x)'))
        if memory.get(expr('ExcessiveThirst(x)'), False) and memory.get(expr('ExcessiveUrination(x)'), False):
            agenda.append(expr('Diabetes(x)'))
        if memory.get(expr('Diabetes(x)'), False) and memory.get(expr('Lupus(x)'), False):
            agenda.append(expr('KidneyDisease(x)'))
        if memory.get(expr('RednessInEyes(x)'), False) and memory.get(expr('DischargeInEyes(x)'), False):
            agenda.append(expr('Conjunctivitis(x)'))
        if memory.get(expr('Conjunctivitis(x)'), False) and memory.get(expr('Lupus(x)'), False):
            agenda.append(expr('Uveitis(x)'))
        if memory.get(expr('Itching(x)'), False) and memory.get(expr('HairLoss(x)'), False):
            agenda.append(expr('SkinInfection(x)'))
        if memory.get(expr('SkinInfection(x)'), False) and memory.get(expr('Uveitis(x)'), False):
            agenda.append(expr('Dermatomyositis(x)'))
        if memory.get(expr('Wheezing(x)'), False) and memory.get(expr('DifficultyBreathing(x)'), False):
            agenda.append(expr('Asthma(x)'))
        if memory.get(expr('Asthma(x)'), False) and memory.get(expr('Dermatomyositis(x)'), False):
            agenda.append(expr('Bronchiolitis(x)'))

def show_results():
    results_window = tk.Tk()
    results_window.title("Diagnosis of your pet")

    results_text = tk.Text(results_window)
    results_text.pack()

    for disease in diseases:
        if memory.get(expr(f'{disease}(x)'), False):
            is_symptom = any(expr(f'{disease}(x)') in agenda for d in agenda if d != expr(f'{disease}(x)'))
            if not is_symptom:
                description = get_disease_description(disease)
                results_text.insert(tk.END, f"- {disease}\n{description}\n\n")

    results_window.mainloop()

def get_disease_description(disease):
    descriptions = {
        "RespiratoryInfection": "Respiratory infection is a common illness affecting the respiratory system.",
        "GastrointestinalIssues": "Gastrointestinal issues refer to problems with the digestive system.",
        "Arthritis": "Arthritis is a condition characterized by inflammation of the joints.",
        "SystemicIllness": "Systemic illness refers to illnesses affecting multiple systems of the body.",
        "Diabetes": "Diabetes is a metabolic disorder characterized by high blood sugar levels.",
        "Conjunctivitis": "Conjunctivitis, also known as pink eye, is an inflammation of the conjunctiva.",
        "SkinInfection": "Skin infection refers to an infection of the skin.",
        "Asthma": "Asthma is a chronic respiratory condition characterized by airway inflammation.",
        "Lupus": "Lupus is an autoimmune disease that can affect various organs.",
        "KidneyDisease": "Kidney disease refers to a condition where the kidneys are damaged and can't filter blood properly.",
        "Uveitis": "Uveitis is inflammation of the uvea, the middle layer of the eye.",
        "Dermatomyositis": "Dermatomyositis is a rare inflammatory disease that causes muscle weakness and skin rash.",
        "Bronchiolitis": "Bronchiolitis is a common respiratory tract infection that affects the small airways in the lungs."
    }
    return descriptions.get(disease, "No description available.")

ask_question()
