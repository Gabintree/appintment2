package aphamale.project.appointment.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.CustomUserDetails;
import aphamale.project.appointment.Repository.UserInfoRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserInfoRepository userInfoRepository;

    public CustomUserDetailService(UserInfoRepository userInfoRepository){

        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException{

        UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);

        if(userInfoDomain != null){

            return new CustomUserDetails(userInfoDomain);
        }


        return null;
        
    }

    
}
