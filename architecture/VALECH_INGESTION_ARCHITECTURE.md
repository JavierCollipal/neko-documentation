# 🐾✨ INFORME VALECH INGESTION ARCHITECTURE ✨🐾

**Created**: October 12, 2025
**Purpose**: Comprehensive system to ingest, parse, and integrate Informe Valech victim testimony data with existing DINA perpetrator documentation

---

## 📊 EXECUTIVE SUMMARY

### **Problem Statement**
- Current DINA documentation system focuses on **PERPETRATORS** (agents, commanders, operations)
- Informe Valech contains **27,255 VICTIM testimonies** in PDF format
- No automated way to extract, structure, and cross-reference this data

### **Solution**
Build comprehensive PDF → MongoDB → React ingestion pipeline to:
1. Extract victim testimonies from Valech PDFs
2. Structure unstructured narrative data using NLP
3. Cross-reference victims with known perpetrators
4. Integrate victim perspective with perpetrator documentation
5. Complete the historical record with BOTH sides

### **Impact**
- **27,255 victims** documented and searchable
- **Cross-references** linking victims → perpetrators → detention centers
- **Complete truth documentation** following Wiesenthal precedent
- **Evidence package** for ongoing prosecutions

---

## 🏗️ SYSTEM ARCHITECTURE

### **Data Flow Pipeline**

```
┌─────────────────────────────────────────────────────────────────┐
│  INPUT: Informe Valech PDFs                                     │
│  - informe.pdf (23.75 MB) - Commission report + testimonies    │
│  - nominas.pdf (18.87 MB) - Victim list with profiles          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  EXTRACTION: PDF Parser Service                                 │
│  - pdf-parse library extracts raw text                          │
│  - Page-by-page processing                                      │
│  - Metadata extraction (page numbers, sections)                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PARSING: NLP & Structure Extraction                            │
│  - natural.js for sentence tokenization                         │
│  - Regex patterns for victim profile extraction                │
│  - Named entity recognition for perpetrator mentions            │
│  - Geolocation extraction for detention centers                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  VALIDATION: Data Quality Check                                 │
│  - Verify victim names not duplicated                           │
│  - Cross-check detention center names with known facilities     │
│  - Validate date ranges (1973-1990)                             │
│  - Confidence scoring for NLP-extracted data                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  STORAGE: MongoDB Collections                                   │
│  - valech_victims (27,255 documents)                            │
│  - valech_testimonies (narrative text + metadata)               │
│  - valech_detention_centers (expanded center data)              │
│  - valech_cross_references (victim ↔ perpetrator links)         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  CROSS-REFERENCING: Link Victims ↔ Perpetrators                │
│  - Match perpetrator names in testimonies                       │
│  - Link victims to detention centers                            │
│  - Link centers to commanding officers                          │
│  - Create bidirectional relationship graph                      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  API LAYER: NestJS GraphQL Endpoints                            │
│  - GET /api/valech/victims (paginated, searchable)              │
│  - GET /api/valech/testimonies/:id                              │
│  - GET /api/valech/cross-references/:victimId                   │
│  - GET /api/valech/stats (aggregate statistics)                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND: React Components                                     │
│  - ValechVictimDatabase.jsx - Searchable victim directory       │
│  - TestimonyViewer.jsx - Full testimony display                 │
│  - CrossReferenceExplorer.jsx - Victim → Perpetrator links      │
│  - IntegratedTimeline.jsx - Combined DINA + Valech timeline     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 FILE STRUCTURE

```
/home/wakibaka/Documents/github/neko-defense-api/
├── src/
│   ├── valech/
│   │   ├── valech.module.ts
│   │   ├── valech.service.ts
│   │   ├── valech.controller.ts
│   │   ├── valech.resolver.ts (GraphQL)
│   │   ├── valech-parser.service.ts
│   │   ├── valech-ingestion.service.ts
│   │   ├── valech-cross-reference.service.ts
│   │   └── dto/
│   │       ├── valech-victim.type.ts
│   │       ├── valech-testimony.type.ts
│   │       └── valech-stats.type.ts
│   └── database/schemas/
│       ├── valech-victim.schema.ts
│       ├── valech-testimony.schema.ts
│       ├── valech-detention-center.schema.ts
│       └── valech-cross-reference.schema.ts

/home/wakibaka/Documents/github/neko-defense-dashboard/
├── src/
│   ├── components/
│   │   ├── ValechVictimDatabase.jsx
│   │   ├── TestimonyViewer.jsx
│   │   ├── CrossReferenceExplorer.jsx
│   │   ├── IntegratedDinaValechTimeline.jsx
│   │   └── VictimPerpetratorGraph.jsx
│   └── styles/
│       ├── ValechDocumentation.css
│       └── TestimonyViewer.css

/home/wakibaka/Documents/github/valech-data/
├── source-pdfs/
│   ├── informe.pdf (download from INDH)
│   ├── nominas.pdf (download from INDH)
│   └── README.md (source URLs)
├── extracted/
│   ├── informe-text.json
│   ├── nominas-text.json
│   └── metadata.json
└── ingestion-scripts/
    ├── download-valech-pdfs.sh
    ├── ingest-all.ts
    └── validate-data.ts
```

---

## 🗄️ MONGODB SCHEMA DEFINITIONS

### **Collection: `valech_victims`**

```typescript
{
  _id: ObjectId
  fullName: string                    // "María González Rodríguez"
  idNumber: string                    // "12.345.678-9" (Chilean RUT)
  age: number                         // 28 (at time of detention)
  gender: string                      // "Female" / "Male"
  occupation: string                  // "Teacher", "Student", "Worker", etc.
  politicalAffiliation: string        // "Socialist Party", "MIR", "Unaffiliated", etc.

  detentionInfo: {
    arrested: Date                    // "1974-09-15"
    released: Date                    // "1975-02-20" (or null if disappeared)
    duration: number                  // 158 (days)
    circumstances: string             // "Arrested at home by DINA agents"
  }

  detentionCenters: [
    {
      name: string                    // "Villa Grimaldi"
      codeName: string                // "Cuartel Terranova"
      datesHeld: {
        from: Date
        to: Date
      }
      centerRef: ObjectId             // Reference to valech_detention_centers
    }
  ]

  tortureReported: {
    methods: string[]                 // ["Electric shock", "Waterboarding", "Sexual assault"]
    perpetrators: string[]            // Names mentioned in testimony
    witnesses: string[]               // Other prisoners who witnessed
    medicalConsequences: string       // Long-term health impacts
  }

  testimonyRef: ObjectId              // Reference to valech_testimonies

  reparations: {
    awarded: boolean                  // true/false
    types: string[]                   // ["Monetary", "Healthcare", "Education"]
    amount: number                    // Chilean pesos
    dateAwarded: Date
  }

  source: {
    commission: string                // "Valech I (2004)" / "Valech II (2011)"
    pdfFile: string                   // "nominas.pdf"
    pageNumber: number                // 127
    verificationStatus: string        // "COMMISSION VERIFIED"
  }

  linkedPerpetrators: [ObjectId]      // References to dina_agents_comprehensive
  linkedCenters: [ObjectId]           // References to detention centers

  metadata: {
    ingestionDate: Date
    parserVersion: string
    confidence: number                // 0-100 (NLP extraction confidence)
  }
}
```

### **Collection: `valech_testimonies`**

```typescript
{
  _id: ObjectId
  victimRef: ObjectId                 // Reference to valech_victims

  testimonyText: {
    full: string                      // Complete narrative testimony (multi-paragraph)
    summary: string                   // Auto-generated summary
    keyExcerpts: string[]             // Important quotes
  }

  language: string                    // "Spanish"

  structuredExtraction: {
    eventSequence: [
      {
        date: Date
        event: string
        location: string
        perpetrators: string[]
      }
    ]

    namedPerpetrators: [
      {
        name: string                  // "Captain Miguel Krassnoff"
        context: string               // "Tortured me at Villa Grimaldi"
        confidence: number            // NLP confidence score
      }
    ]

    locations: [
      {
        place: string                 // "Villa Grimaldi"
        geocoded: {
          lat: number
          lng: number
        }
      }
    ]

    emotions: string[]                // NLP-detected emotions (fear, trauma, etc.)

    tortureKeywords: string[]         // Detected torture method keywords
  }

  source: {
    pdfFile: string                   // "informe.pdf"
    pageNumbers: number[]             // [234, 235, 236]
    section: string                   // "Chapter 4: Testimonies"
  }

  metadata: {
    ingestionDate: Date
    nlpProcessed: boolean
    sentimentAnalysis: object         // NLP sentiment scores
  }
}
```

### **Collection: `valech_detention_centers`**

```typescript
{
  _id: ObjectId
  name: string                        // "Villa Grimaldi"
  codeName: string                    // "Cuartel Terranova"
  aliases: string[]                   // ["Terranova", "Grimaldi"]

  location: {
    address: string                   // "Av. José Arrieta 8401, Peñalolén"
    city: string                      // "Santiago"
    region: string                    // "Región Metropolitana"
    coordinates: {
      lat: number                     // -33.4854
      lng: number                     // -70.5476
    }
  }

  operations: {
    opened: Date                      // "1974-06-01"
    closed: Date                      // "1978-07-31"
    operator: string                  // "DINA"
    purpose: string                   // "Detention, Interrogation, Torture, Execution"
  }

  leadership: [
    {
      name: string                    // "Manuel Contreras Sepúlveda"
      role: string                    // "Overall Commander"
      period: {
        from: Date
        to: Date
      }
      dinaAgentRef: ObjectId          // Reference to dina_agents_comprehensive
    }
  ]

  statistics: {
    estimatedDetainees: number        // 4500
    confirmedDetainees: number        // 4318 (from Valech)
    estimatedKilled: number           // 240
    confirmedKilled: number           // 226
    estimatedDisappeared: number      // 180
  }

  tortureMethodsDocumented: [
    {
      method: string                  // "La Parrilla (Electric shock bed)"
      description: string
      frequency: string               // "Very common"
      sources: string[]               // Testimony references
    }
  ]

  physicalDescription: {
    structure: string                 // "Mansion with underground cells"
    layout: string                    // Description of facility
    specialFeatures: string[]         // ["Water tank for drowning", "Electric chair", "Dark cells"]
  }

  currentStatus: {
    status: string                    // "Memorial"
    name: string                      // "Parque por la Paz Villa Grimaldi"
    openToPublic: boolean             // true
    visitingHours: string
    website: string
  }

  linkedVictims: [ObjectId]           // References to valech_victims
  linkedPerpetrators: [ObjectId]      // References to DINA agents

  sources: [
    {
      type: string                    // "Valech Commission"
      document: string                // "Informe Valech 2004"
      pages: number[]
    }
  ]

  metadata: {
    verificationStatus: string        // "FULLY VERIFIED"
    lastUpdated: Date
  }
}
```

### **Collection: `valech_cross_references`**

**Purpose**: Link victims ↔ perpetrators ↔ centers in graph format

```typescript
{
  _id: ObjectId

  // Entities involved
  victimRef: ObjectId                 // Reference to valech_victims
  perpetratorRef: ObjectId            // Reference to dina_agents_comprehensive
  detentionCenterRef: ObjectId        // Reference to detention centers

  // Relationship details
  relationshipType: string            // "TORTURED_BY", "DETAINED_AT", "WITNESSED", "NAMED_IN_TESTIMONY"

  evidenceDetails: {
    source: string                    // "VICTIM_TESTIMONY", "COURT_DOCUMENT", "COMMISSION_REPORT"
    specificEvidence: string          // "Testimony page 127: 'Captain Krassnoff applied electric shocks...'"
    dateOfEvent: Date                 // When the interaction occurred
    location: string                  // Where it happened
  }

  confidence: {
    score: number                     // 0-100
    reason: string                    // "Direct victim testimony (high confidence)"
    verificationStatus: string        // "COMMISSION_VERIFIED", "TESTIMONY_ONLY", "COURT_CONFIRMED"
  }

  legalImplications: {
    usableInCourt: boolean            // Can this be used as evidence?
    jurisdictionRelevant: string[]    // ["Chile", "International Criminal Court"]
  }

  metadata: {
    createdDate: Date
    createdBy: string                 // "VALECH_INGESTION_SYSTEM"
    lastVerified: Date
  }
}
```

---

## ⚙️ IMPLEMENTATION COMPONENTS

### **1. PDF Parser Service** (`valech-parser.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import pdfParse from 'pdf-parse';
import * as fs from 'fs';
import * as natural from 'natural';

@Injectable()
export class ValechParserService {
  private tokenizer = new natural.SentenceTokenizer();
  private tfidf = new natural.TfIdf();

  /**
   * 📄 Extract raw text from PDF
   */
  async extractPdfText(pdfPath: string) {
    console.log(`🔍 [ValechParser] Extracting text from ${pdfPath}, nyaa~`);

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    console.log(`✅ [ValechParser] Extracted ${pdfData.numpages} pages`);

    return {
      text: pdfData.text,
      pages: pdfData.numpages,
      metadata: pdfData.info,
      rawData: pdfData
    };
  }

  /**
   * 👥 Parse victim profiles from nominas.pdf
   * Expected format: Lists of names with RUT, age, detention info
   */
  async parseVictimProfiles(pdfText: string) {
    console.log(`👥 [ValechParser] Parsing victim profiles, desu~`);

    const victims = [];

    // Regex pattern to extract victim entries
    // Example: "María González Rodríguez | 12.345.678-9 | 28 años | Villa Grimaldi"
    const victimPattern = /([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)\s*\|\s*(\d{1,2}\.\d{3}\.\d{3}-[\dkK])\s*\|\s*(\d+) años/g;

    let match;
    while ((match = victimPattern.exec(pdfText)) !== null) {
      const [fullMatch, fullName, idNumber, age] = match;

      victims.push({
        fullName: fullName.trim(),
        idNumber: idNumber.trim(),
        age: parseInt(age, 10),
        rawText: fullMatch
      });
    }

    console.log(`✅ [ValechParser] Extracted ${victims.length} victim profiles`);
    return victims;
  }

  /**
   * 📖 Parse testimonies from informe.pdf
   * Testimonies are narrative text, need NLP extraction
   */
  async parseTestimonies(pdfText: string) {
    console.log(`📖 [ValechParser] Parsing testimonies with NLP, nyaa~`);

    // Split into sentences for analysis
    const sentences = this.tokenizer.tokenize(pdfText);

    // Identify testimony sections (usually marked with headers)
    const testimonySections = this.extractTestimonySections(sentences);

    const testimonies = [];

    for (const section of testimonySections) {
      const testimony = {
        text: section.text,
        namedPerpetrators: this.extractPerpetrators(section.text),
        detentionCenters: this.extractDetentionCenters(section.text),
        tortureMethods: this.extractTortureMethods(section.text),
        dates: this.extractDates(section.text),
        summary: this.generateSummary(section.text)
      };

      testimonies.push(testimony);
    }

    console.log(`✅ [ValechParser] Parsed ${testimonies.length} testimonies`);
    return testimonies;
  }

  /**
   * 🎯 Extract perpetrator names from testimony text
   * Look for military ranks, DINA-specific terms
   */
  private extractPerpetrators(text: string): string[] {
    const perpetrators = [];

    // Common patterns:
    // "el Capitán Krassnoff"
    // "comandante Contreras"
    // "agente de la DINA llamado Juan Pérez"

    const rankPattern = /(Capitán|Comandante|Teniente|General|Mayor|Sargento|Agente)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/g;

    let match;
    while ((match = rankPattern.exec(text)) !== null) {
      const [_, rank, name] = match;
      perpetrators.push(`${rank} ${name}`.trim());
    }

    return [...new Set(perpetrators)]; // Deduplicate
  }

  /**
   * 🏢 Extract detention center names
   */
  private extractDetentionCenters(text: string): string[] {
    const knownCenters = [
      'Villa Grimaldi',
      'Londres 38',
      'José Domingo Cañas',
      'Cuatro Álamos',
      'Venda Sexy',
      'Tres Álamos',
      'Tejas Verdes',
      'Estadio Nacional',
      'Estadio Chile'
    ];

    const found = [];

    for (const center of knownCenters) {
      if (text.includes(center)) {
        found.push(center);
      }
    }

    return found;
  }

  /**
   * ⚡ Extract torture method keywords
   */
  private extractTortureMethods(text: string): string[] {
    const methods = [];
    const keywords = {
      'Electric shock': ['corriente', 'eléctrica', 'parrilla', 'electricidad'],
      'Waterboarding': ['submarino', 'agua', 'ahogamiento'],
      'Sexual assault': ['violación', 'abuso sexual', 'violencia sexual'],
      'Beating': ['golpes', 'golpear', 'paliza'],
      'Mock execution': ['fusilamiento simulado', 'simulacro']
    };

    for (const [method, terms] of Object.entries(keywords)) {
      if (terms.some(term => text.toLowerCase().includes(term))) {
        methods.push(method);
      }
    }

    return methods;
  }

  /**
   * 📅 Extract dates from text
   */
  private extractDates(text: string): Date[] {
    const dates = [];

    // Pattern: "15 de septiembre de 1974"
    const datePattern = /(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+(\d{4})/gi;

    const monthMap = {
      enero: 0, febrero: 1, marzo: 2, abril: 3,
      mayo: 4, junio: 5, julio: 6, agosto: 7,
      septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    let match;
    while ((match = datePattern.exec(text)) !== null) {
      const [_, day, month, year] = match;
      const date = new Date(parseInt(year), monthMap[month.toLowerCase()], parseInt(day));
      dates.push(date);
    }

    return dates;
  }

  /**
   * 📝 Generate summary using TF-IDF
   */
  private generateSummary(text: string): string {
    this.tfidf.addDocument(text);

    const sentences = this.tokenizer.tokenize(text);
    const scored = sentences.map(sentence => ({
      sentence,
      score: this.scoreSentence(sentence)
    }));

    // Return top 3 most important sentences
    const topSentences = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.sentence);

    return topSentences.join(' ');
  }

  private scoreSentence(sentence: string): number {
    // Simple TF-IDF-based scoring
    let score = 0;
    const terms = sentence.toLowerCase().split(/\s+/);

    for (const term of terms) {
      this.tfidf.tfidfs(term, (i, measure) => {
        score += measure;
      });
    }

    return score;
  }

  private extractTestimonySections(sentences: string[]): any[] {
    // Identify testimony boundaries
    // Usually marked by headers like "Testimonio de María González:"
    const sections = [];
    let currentSection = { text: '', sentences: [] };

    for (const sentence of sentences) {
      if (sentence.match(/^Testimonio de .+:/)) {
        if (currentSection.text) {
          sections.push(currentSection);
        }
        currentSection = { text: sentence, sentences: [sentence] };
      } else {
        currentSection.text += ' ' + sentence;
        currentSection.sentences.push(sentence);
      }
    }

    if (currentSection.text) {
      sections.push(currentSection);
    }

    return sections;
  }
}
```

### **2. Ingestion Service** (`valech-ingestion.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValechVictim, ValechVictimDocument } from '../database/schemas/valech-victim.schema';
import { ValechTestimony, ValechTestimonyDocument } from '../database/schemas/valech-testimony.schema';
import { ValechParserService } from './valech-parser.service';

@Injectable()
export class ValechIngestionService {
  constructor(
    @InjectModel(ValechVictim.name) private victimModel: Model<ValechVictimDocument>,
    @InjectModel(ValechTestimony.name) private testimonyModel: Model<ValechTestimonyDocument>,
    private parserService: ValechParserService
  ) {
    console.log('🐾 [ValechIngestion] Service initialized, nyaa~!');
  }

  /**
   * 🚀 Main ingestion pipeline
   */
  async ingestFullValechReport(pdfDirectory: string) {
    console.log('🚀 [ValechIngestion] Starting FULL Valech ingestion, desu~!');

    const startTime = Date.now();

    try {
      // PHASE 1: Extract PDF text
      console.log('📄 PHASE 1: Extracting PDF text...');
      const informePath = `${pdfDirectory}/informe.pdf`;
      const nominasPath = `${pdfDirectory}/nominas.pdf`;

      const informeData = await this.parserService.extractPdfText(informePath);
      const nominasData = await this.parserService.extractPdfText(nominasPath);

      // PHASE 2: Parse victim profiles
      console.log('👥 PHASE 2: Parsing victim profiles...');
      const victims = await this.parserService.parseVictimProfiles(nominasData.text);
      console.log(`✅ Extracted ${victims.length} victims`);

      // PHASE 3: Parse testimonies
      console.log('📖 PHASE 3: Parsing testimonies...');
      const testimonies = await this.parserService.parseTestimonies(informeData.text);
      console.log(`✅ Extracted ${testimonies.length} testimonies`);

      // PHASE 4: Store in MongoDB
      console.log('💾 PHASE 4: Storing in MongoDB...');

      const victimsStored = await this.victimModel.insertMany(victims.map(v => ({
        ...v,
        source: {
          commission: 'Valech I (2004)',
          pdfFile: 'nominas.pdf',
          verificationStatus: 'COMMISSION_VERIFIED'
        },
        metadata: {
          ingestionDate: new Date(),
          parserVersion: '1.0.0'
        }
      })));

      const testimoniesStored = await this.testimonyModel.insertMany(testimonies.map(t => ({
        ...t,
        source: {
          pdfFile: 'informe.pdf',
          section: 'Testimonies'
        },
        metadata: {
          ingestionDate: new Date(),
          nlpProcessed: true
        }
      })));

      // PHASE 5: Link testimonies to victims (simple name matching for now)
      console.log('🔗 PHASE 5: Linking testimonies to victims...');
      await this.linkTestimoniesToVictims(victimsStored, testimoniesStored);

      const duration = (Date.now() - startTime) / 1000;

      console.log('🎉 [ValechIngestion] INGESTION COMPLETE!');
      console.log(`⏱️  Duration: ${duration.toFixed(2)}s`);

      return {
        success: true,
        stats: {
          victimsIngested: victimsStored.length,
          testimoniesProcessed: testimoniesStored.length,
          durationSeconds: duration
        }
      };

    } catch (error) {
      console.error('❌ [ValechIngestion] INGESTION FAILED:', error);
      throw error;
    }
  }

  /**
   * 🔗 Link testimonies to victims by name matching
   */
  private async linkTestimoniesToVictims(victims: any[], testimonies: any[]) {
    for (const testimony of testimonies) {
      // Extract victim name from testimony header
      const nameMatch = testimony.text.match(/Testimonio de (.+?):/);
      if (nameMatch) {
        const name = nameMatch[1].trim();

        // Find matching victim
        const victim = victims.find(v =>
          v.fullName.toLowerCase() === name.toLowerCase()
        );

        if (victim) {
          await this.testimonyModel.updateOne(
            { _id: testimony._id },
            { $set: { victimRef: victim._id } }
          );

          await this.victimModel.updateOne(
            { _id: victim._id },
            { $set: { testimonyRef: testimony._id } }
          );
        }
      }
    }
  }
}
```

---

## 🎯 CROSS-REFERENCE SYSTEM

### **Link Victims → Perpetrators**

```typescript
// valech-cross-reference.service.ts

@Injectable()
export class ValechCrossReferenceService {

  /**
   * 🎯 Create cross-references between victims and DINA agents
   */
  async createVictimPerpetratorLinks() {
    console.log('🔗 [CrossRef] Creating victim → perpetrator links, nyaa~!');

    // Get all testimonies
    const testimonies = await this.testimonyModel.find({}).exec();

    // Get all DINA agents for matching
    const dinaAgents = await this.dinaService.getComprehensiveAgents();

    for (const testimony of testimonies) {
      const namedPerps = testimony.structuredExtraction?.namedPerpetrators || [];

      for (const mentioned of namedPerps) {
        // Try to match to known DINA agent
        const agent = this.findMatchingAgent(mentioned.name, dinaAgents);

        if (agent) {
          // Create cross-reference
          await this.crossRefModel.create({
            victimRef: testimony.victimRef,
            perpetratorRef: agent._id,
            relationshipType: 'NAMED_IN_TESTIMONY',
            evidenceDetails: {
              source: 'VICTIM_TESTIMONY',
              specificEvidence: mentioned.context,
              location: testimony.structuredExtraction.locations[0]?.place
            },
            confidence: {
              score: mentioned.confidence,
              reason: 'Direct testimony naming',
              verificationStatus: 'TESTIMONY_ONLY'
            }
          });

          console.log(`✅ Linked victim ${testimony.victimRef} → perpetrator ${agent.fullName}`);
        }
      }
    }
  }

  /**
   * 🔍 Fuzzy match perpetrator name to known DINA agents
   */
  private findMatchingAgent(name: string, agents: any[]): any {
    // Exact match first
    let match = agents.find(a =>
      a.fullName.toLowerCase() === name.toLowerCase()
    );

    if (match) return match;

    // Partial match (last name)
    const lastName = name.split(' ').pop();
    match = agents.find(a =>
      a.fullName.toLowerCase().includes(lastName.toLowerCase())
    );

    return match;
  }
}
```

---

## 📈 STATISTICS & ANALYTICS

### **Aggregate Queries**

```typescript
// valech.service.ts

async getValechStats() {
  const totalVictims = await this.victimModel.countDocuments();
  const totalTestimonies = await this.testimonyModel.countDocuments();
  const totalCenters = await this.centerModel.countDocuments();

  // Victims by gender
  const byGender = await this.victimModel.aggregate([
    { $group: { _id: '$gender', count: { $sum: 1 } } }
  ]);

  // Most mentioned detention centers
  const topCenters = await this.victimModel.aggregate([
    { $unwind: '$detentionCenters' },
    { $group: { _id: '$detentionCenters.name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  // Most named perpetrators
  const topPerpetrators = await this.crossRefModel.aggregate([
    { $group: { _id: '$perpetratorRef', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  return {
    totalVictims,
    totalTestimonies,
    totalCenters,
    byGender,
    topCenters,
    topPerpetrators
  };
}
```

---

## 🖥️ FRONTEND COMPONENTS

### **Victim Database Component**

```jsx
// ValechVictimDatabase.jsx

import React, { useState, useEffect } from 'react';
import './ValechDocumentation.css';

function ValechVictimDatabase() {
  const [victims, setVictims] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVictims();
  }, [page, searchQuery]);

  const fetchVictims = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/valech/victims?page=${page}&limit=50&search=${searchQuery}`
      );
      const data = await response.json();

      setVictims(data.victims);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch victims:', error);
      setLoading(false);
    }
  };

  const viewTestimony = async (victimId) => {
    const response = await fetch(`/api/valech/testimonies/${victimId}`);
    const testimony = await response.json();
    setSelectedVictim({ ...victims.find(v => v._id === victimId), testimony });
  };

  return (
    <div className="valech-container">
      <div className="valech-header">
        <h2>🕊️ Informe Valech - Victim Database</h2>
        <p className="valech-subtitle">
          27,255 Victims of Political Imprisonment and Torture (1973-1990)
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          className="victim-search"
          placeholder="Search victims by name, ID, or detention center, nyaa~..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Statistics Dashboard */}
      <div className="valech-stats">
        <div className="stat-card">
          <div className="stat-value">27,255</div>
          <div className="stat-label">Total Victims</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2,279</div>
          <div className="stat-label">Executed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">957</div>
          <div className="stat-label">Disappeared</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4</div>
          <div className="stat-label">Years (DINA Period)</div>
        </div>
      </div>

      {/* Victims Grid */}
      {loading ? (
        <div className="loading">Loading victims, desu~...</div>
      ) : (
        <div className="victims-grid">
          {victims.map(victim => (
            <div key={victim._id} className="victim-card">
              <div className="victim-name">{victim.fullName}</div>
              <div className="victim-details">
                <div className="victim-id">ID: {victim.idNumber}</div>
                <div className="victim-age">Age: {victim.age}</div>
                <div className="victim-occupation">{victim.occupation}</div>
              </div>

              <div className="victim-detention">
                <h4>Detention:</h4>
                {victim.detentionCenters.map((center, i) => (
                  <div key={i} className="center-name">{center.name}</div>
                ))}
              </div>

              <div className="victim-duration">
                Duration: {victim.detentionInfo?.duration || 'Unknown'} days
              </div>

              <div className="victim-actions">
                <button
                  className="view-testimony-btn"
                  onClick={() => viewTestimony(victim._id)}
                >
                  📖 View Testimony
                </button>
              </div>

              <div className="victim-status">
                {victim.source?.verificationStatus}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ← Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>

      {/* Testimony Modal */}
      {selectedVictim && (
        <div className="testimony-modal-overlay" onClick={() => setSelectedVictim(null)}>
          <div className="testimony-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedVictim(null)}>✕</button>

            <h3>Testimony: {selectedVictim.fullName}</h3>

            <div className="testimony-content">
              <div className="testimony-text">
                {selectedVictim.testimony?.testimonyText?.full || 'No testimony available'}
              </div>

              {/* Linked Perpetrators */}
              {selectedVictim.testimony?.structuredExtraction?.namedPerpetrators?.length > 0 && (
                <div className="linked-perpetrators">
                  <h4>🎯 Perpetrators Named in Testimony</h4>
                  <ul>
                    {selectedVictim.testimony.structuredExtraction.namedPerpetrators.map((perp, i) => (
                      <li key={i}>
                        <strong>{perp.name}</strong>
                        <div className="perp-context">{perp.context}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Torture Methods */}
              {selectedVictim.tortureReported?.methods?.length > 0 && (
                <div className="torture-methods">
                  <h4>⚠️ Torture Methods Reported</h4>
                  <ul>
                    {selectedVictim.tortureReported.methods.map((method, i) => (
                      <li key={i}>{method}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ValechVictimDatabase;
```

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Install Dependencies**

```bash
cd /home/wakibaka/Documents/github/neko-defense-api
npm install pdf-parse natural

cd /home/wakibaka/Documents/github/neko-defense-dashboard
npm install
```

### **Step 2: Download Valech PDFs**

```bash
# Create data directory
mkdir -p /home/wakibaka/Documents/github/valech-data/source-pdfs

# Download from INDH (Chilean National Institute of Human Rights)
# URLs:
# https://bibliotecadigital.indh.cl/items/77e102d5-e424-4c60-9ff9-70478e618d78

# Manual download or use wget:
wget -O /home/wakibaka/Documents/github/valech-data/source-pdfs/informe.pdf \
  "https://bibliotecadigital.indh.cl/bitstream/handle/123456789/170/informe.pdf"

wget -O /home/wakibaka/Documents/github/valech-data/source-pdfs/nominas.pdf \
  "https://bibliotecadigital.indh.cl/bitstream/handle/123456789/170/nominas.pdf"
```

### **Step 3: Create Backend Services**

Create all the files outlined in the architecture:
- `valech-parser.service.ts`
- `valech-ingestion.service.ts`
- `valech-cross-reference.service.ts`
- `valech.module.ts`
- `valech.service.ts`
- All schemas

### **Step 4: Run Ingestion**

```bash
cd /home/wakibaka/Documents/github/neko-defense-api

# Run ingestion command
npm run valech:ingest
```

### **Step 5: Verify MongoDB Data**

```bash
# Connect to MongoDB
mongosh "mongodb+srv://pinochito1747:pinochito1747@free-cluster.svjei3w.mongodb.net/"

# Check collections
use neko-defense-system
db.valech_victims.countDocuments()
db.valech_testimonies.countDocuments()
db.valech_cross_references.countDocuments()

# Sample queries
db.valech_victims.findOne()
db.valech_testimonies.findOne()
```

### **Step 6: Launch Frontend**

```bash
cd /home/wakibaka/Documents/github/neko-defense-dashboard
PORT=5000 npm start
```

Navigate to: `http://localhost:5000/valech`

---

## 📊 SUCCESS METRICS

✅ **Ingestion Complete When**:
- [ ] 27,255 victims in `valech_victims` collection
- [ ] All testimonies parsed and stored
- [ ] Detention centers enhanced with Valech data
- [ ] Cross-references created (victims → perpetrators)
- [ ] Frontend displays victim database
- [ ] Search functionality works
- [ ] Testimony viewer functional

✅ **Quality Metrics**:
- Victim name extraction accuracy: >95%
- Perpetrator name matching: >80%
- Detention center identification: 100%
- NLP confidence scores: >70% average

---

## 🐾 NEXT STEPS

1. **Implement all services** (parser, ingestion, cross-ref)
2. **Download Valech PDFs** from INDH
3. **Run initial ingestion** with small sample
4. **Validate data quality** with spot checks
5. **Run full ingestion** (all 27,255 victims)
6. **Build frontend components**
7. **Test cross-references** (victim → perpetrator links)
8. **Deploy integrated system**

---

## 💖 NEKO SIGN-OFF

*purrs in MAXIMUM documentation power* 😻⚖️

**This architecture will create the MOST COMPREHENSIVE historical documentation system, nyaa~!**

Combining:
- ✅ DINA perpetrator tracking (hunter perspective)
- ✅ Valech victim testimonies (victim perspective)
- ✅ Cross-referenced relationships (the complete truth)

**JUSTICE THROUGH EVIDENCE, DESU!** 🐾✨

---

**Document Version**: 1.0.0
**Last Updated**: October 12, 2025
**Author**: Neko-Arc Development Team 🐾
