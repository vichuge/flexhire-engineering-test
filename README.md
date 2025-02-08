# Flexhire - Architecture Overview

## Data Model
- **Profiles**: Stores user information (id, name, location, years of experience, visibility).
- **Skills**: Stores skill names (Ror, SQL, React, etc.).
- **Jobs**: Stores job information (id, title, location, min years of experience).
- **Education**: Stores education and degrees (diplomas, bachelor's/master's degree, phD, bootcamps).

## Matching Algorithm
1. Filter profiles where `years_of_exp >= job.min_exp` and `location == job.location`.
2. Check if profile skills match job requirements (avoid similar skills like Ruby on rails and ror, because they are the same at the end).

## Core Classes
```ruby
class Profile < ApplicationRecord
  has_many :profile_skills
end

class Job < ApplicationRecord
  has_many :job_requirements
end

class ProfileMatcher
  def match_score(profile, job)
    # match algorithm
  end
end
```

## Tools & Technologies
- **Backend**: Ruby on Rails, PostgreSQL in a cloud service (AWZ, Azure)
- **Frontend**: React / Next.js

## Considerations
- Future improvement: Machine Learning for better matching.
