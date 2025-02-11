using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command: IRequest<Activity>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command, Activity>
        {
            private readonly DataContext _context = context;
            
            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var newActivity = await _context.Activities.AddAsync(request.Activity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return newActivity.Entity;
            }
        }
    }
}