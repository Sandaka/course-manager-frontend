import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

export interface PeriodicElement {
  course_name: string;
  start_date: string;
  end_date: string;
  duration: string;
  mode: string;
  payment_plan: string;
  schedule: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { course_name: 'BSc (Computer Science)', start_date: '10/10/2022', end_date: '10/10/2026', duration: '3 Years', mode: 'Full time', payment_plan: 'Plan A', schedule: 'Monday to Friday | 8.00AM-2.00PM' },
  { course_name: 'BSc (Computer Science)', start_date: '10/10/2022', end_date: '10/10/2026', duration: '3 Years', mode: 'Part time', payment_plan: 'Plan B', schedule: 'Saturday and Sunday | 8.00AM-5.00PM' },

];

@Component({
  selector: 'app-student-self-registration',
  templateUrl: './student-self-registration.component.html',
  styleUrls: ['./student-self-registration.component.scss']
})
export class StudentSelfRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['course_name', 'start_date', 'end_date', 'duration', 'mode', 'schedule', 'payment_plan'];
  dataSource = ELEMENT_DATA;


  data = [
    { state: 'Year 1', county: '100,000.00', item: '01-03-2022' },
    { state: 'Year 1', county: '200,000.00', item: '01-09-2022' },
    { state: 'Year 2', county: '100,000.00', item: 0.04 },
    { state: 'Year 3', county: '100,000.00', item: 0.14 },
    // { state: 'CA', county: '2', item: 0.019 },
    // { state: 'MN', county: '1', item: 0.0374 }, 
    // { state: 'CA', county: '2', item: 0.037 },
    // { state: 'CA', county: '3', item: 0.14 }
  ];

  dataExt: any[] = [];

  courseModes: string[] = ['Full time', 'Part time'];
  paymentModes: string[] = ['Full time', 'Part time'];

  createResumeParentForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.processData();
  }

  ngOnInit(): void {
    this.createResumeParentForm = this.fb.group({
      //firstName: new FormControl('', Validators.required),
      //lastName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl(0, Validators.required),
      civilStatus: new FormControl(0, Validators.required),
      //jobSector: new FormControl('', Validators.required),
      subSectorId: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      linkedInUrl: new FormControl('', Validators.required),
      description: new FormControl(''),
      imageUrl: new FormControl(''),
      loggedInUserId: new FormControl(''),
      userId: new FormControl(1),
      //     pokemonControl: new FormControl(''),
      // toppings: new FormControl(''),
      educationalQualificationList: this.fb.array([]),
      professionalQualificationList: this.fb.array([]),
    });

    this.addEducation();
    this.addQualification();
  }

  get educationalQualificationList(): FormArray {
    return this.createResumeParentForm.get('educationalQualificationList') as FormArray;
  }

  get professionalQualificationList(): FormArray {
    return this.createResumeParentForm.get('professionalQualificationList') as FormArray;
  }

  addEducation() {
    this.educationalQualificationList.push(this.newEducation());
  }

  addQualification() {
    this.professionalQualificationList.push(this.newQualification());
  }

  newEducation(): FormGroup {
    return this.fb.group({
      educationalLevel: new FormControl('', Validators.required),
      eduInstituteName: new FormControl('', Validators.required),
      eduFromYear: new FormControl('', Validators.required),
      eduToYear: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      eduGrade: new FormControl('', Validators.required)
    })
  }

  newQualification(): FormGroup {
    return this.fb.group({
      qualificationName: new FormControl(''),
      pqInstituteName: new FormControl(''),
      pqGrade: new FormControl('')
    })
  }

  removeEducation(eduIndex: number) {
    this.educationalQualificationList.removeAt(eduIndex);
  }

  removeQualification(pqIndex: number) {
    this.professionalQualificationList.removeAt(pqIndex);
  }

  pokemonControl = new FormControl('');
  toppings = new FormControl('');
  toppingList: string[] = ['Colombo', 'Horana', 'Panadura', 'Kalutara', 'Kandy', 'Galle'];
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Bachelors',
      pokemon: [
        { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
        { value: 'oddish-1', viewValue: 'Oddish' },
        { value: 'bellsprout-2', viewValue: 'Bellsprout' },
      ],
    },
    {
      name: 'Masters',
      pokemon: [
        { value: 'squirtle-3', viewValue: 'Squirtle' },
        { value: 'psyduck-4', viewValue: 'Psyduck' },
        { value: 'horsea-5', viewValue: 'Horsea' },
      ],
    },
    {
      name: 'Doctoral',
      disabled: true,
      pokemon: [
        { value: 'charmander-6', viewValue: 'Charmander' },
        { value: 'vulpix-7', viewValue: 'Vulpix' },
        { value: 'flareon-8', viewValue: 'Flareon' },
      ],
    },
    {
      name: 'Diploma',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ],
    },
  ];

  private processData() {
    const statesSeen: any = {};
    const countiesSeen: any = {};

    this.dataExt = this.data.sort((a, b) => {
      const stateComp = a.state.localeCompare(b.state);
      return stateComp ? stateComp : a.county.localeCompare(b.county);
    }).map(x => {
      const stateSpan = statesSeen[x.state] ? 0 :
        this.data.filter(y => y.state === x.state).length;

      statesSeen[x.state] = true;

      const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
        this.data.filter(y => y.state === x.state && y.county === x.county).length;

      countiesSeen[x.state] = countiesSeen[x.state] || {};
      countiesSeen[x.state][x.county] = true;

      return { ...x, stateSpan, countySpan };
    });
  }
}
